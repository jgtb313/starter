// import * as pulumi from '@pulumi/pulumi'
// import * as aws from '@pulumi/aws'
// import * as awsx from '@pulumi/awsx'

// const config = new pulumi.Config()
// const containerPort = config.getNumber('containerPort') ?? 80
// const cpu = config.getNumber('cpu') ?? 512
// const memory = config.getNumber('memory') ?? 128

// // Create a new VPC
// export const vpc = new awsx.ec2.Vpc('my-vpc', {
//   numberOfAvailabilityZones: 2,
//   natGateways: {
//     strategy: awsx.ec2.NatGatewayStrategy.OnePerAz
//   }
// })

// // An ECS cluster to deploy into
// export const cluster = new aws.ecs.Cluster('cluster', {
//   settings: [
//     {
//       name: 'containerInsights',
//       value: 'enabled'
//     }
//   ]
// })

// // An ALB to serve the container endpoint to the internet
// export const loadbalancer = new awsx.lb.ApplicationLoadBalancer('loadbalancer', {
//   subnetIds: vpc.publicSubnetIds
// })

// // An ECR repository to store our application's container image
// export const repo = new awsx.ecr.Repository('repo', {
//   forceDelete: true
// })

// // Build and publish our application's container image from ./app to the ECR repository
// export const image = new awsx.ecr.Image('image', {
//   repositoryUrl: repo.url,
//   context: './app',
//   platform: 'linux/amd64'
// })

// // Deploy an ECS Service on Fargate to host the application container
// export const service = new awsx.ecs.FargateService('service', {
//   cluster: cluster.arn,
//   networkConfiguration: {
//     subnets: vpc.privateSubnetIds,
//     assignPublicIp: true
//   },
//   taskDefinitionArgs: {
//     container: {
//       name: 'app',
//       image: image.imageUri,
//       cpu,
//       memory,
//       essential: true,
//       portMappings: [
//         {
//           name: 'app-port',
//           containerPort: containerPort,
//           targetGroup: loadbalancer.defaultTargetGroup,
//           appProtocol: 'http'
//         }
//       ],
//       logConfiguration: {
//         logDriver: 'awslogs',
//         options: {
//           'awslogs-group': '/ecs/app',
//           'awslogs-region': 'us-east-1',
//           'awslogs-stream-prefix': 'ecs'
//         }
//       },
//       healthCheck: {
//         command: ['CMD-SHELL', `curl -f http://localhost:${containerPort}/health || exit 1`],
//         interval: 30,
//         timeout: 5,
//         retries: 3,
//         startPeriod: 60
//       }
//     }
//   }
// })

// // The URL at which the container's HTTP endpoint will be available
// export const url = pulumi.interpolate`http://${loadbalancer.loadBalancer.dnsName}`

import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'

// Create a new VPC
const vpc = new awsx.ec2.Vpc('api-vpc', {
  numberOfAvailabilityZones: 2,
})

// Create an ECS cluster
const cluster = new aws.ecs.Cluster('api-cluster')

// Create an ECR repository
const repo = new awsx.ecr.Repository('api-repo', {
  forceDelete: true,
})

// Build and push the Docker image to ECR
const image = new awsx.ecr.Image('api-image', {
  repositoryUrl: repo.url,
  path: './app',
})

// Create a CloudWatch log group
const logGroup = new aws.cloudwatch.LogGroup('api-logs', {
  retentionInDays: 7,
})

// Create an Application Load Balancer
const lb = new awsx.lb.ApplicationLoadBalancer('api-alb', {
  subnetIds: vpc.publicSubnetIds,
})

// Create a target group for the ALB
const targetGroup = new aws.lb.TargetGroup('api-tg', {
  port: 3000,
  protocol: 'HTTP',
  targetType: 'ip',
  vpcId: vpc.vpcId,
  healthCheck: {
    path: '/health',
    protocol: 'HTTP',
  },
})

// Create a listener for the ALB
const listener = new aws.lb.Listener('api-listener', {
  loadBalancerArn: lb.loadBalancer.arn,
  port: 80,
  defaultActions: [
    {
      type: 'forward',
      targetGroupArn: targetGroup.arn,
    },
  ],
})

// Create a Fargate service
const service = new awsx.ecs.FargateService('api-service', {
  cluster: cluster.arn,
  networkConfiguration: {
    subnets: vpc.privateSubnetIds,
    assignPublicIp: true,
  },
  taskDefinitionArgs: {
    container: {
      name: 'api',
      image: image.imageUri,
      cpu: 256,
      memory: 512,
      portMappings: [{ targetGroup }],
      logConfiguration: {
        logDriver: 'awslogs',
        options: {
          'awslogs-group': logGroup.name,
          'awslogs-region': aws.config.region,
          'awslogs-stream-prefix': 'api',
        },
      },
    },
  },
  desiredCount: 2,
  healthCheckGracePeriodSeconds: 60,
})

// Set up auto scaling
const autoScaling = new aws.appautoscaling.Target('api-autoscaling', {
  maxCapacity: 10,
  minCapacity: 2,
  resourceId: pulumi.interpolate`service/${cluster.name}/${service.service.name}`,
  scalableDimension: 'ecs:service:DesiredCount',
  serviceNamespace: 'ecs',
})

const scaleUpPolicy = new aws.appautoscaling.Policy('scale-up', {
  policyType: 'TargetTrackingScaling',
  resourceId: autoScaling.resourceId,
  scalableDimension: autoScaling.scalableDimension,
  serviceNamespace: autoScaling.serviceNamespace,
  targetTrackingScalingPolicyConfiguration: {
    predefinedMetricSpecification: {
      predefinedMetricType: 'ECSServiceAverageCPUUtilization',
    },
    targetValue: 75,
    scaleInCooldown: 300,
    scaleOutCooldown: 300,
  },
})

// Export the URL of the load balancer
export const url = lb.loadBalancer.dnsName.apply((dns) => `http://${dns}`)
