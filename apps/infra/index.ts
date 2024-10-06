import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'

const config = new pulumi.Config()
const containerPort = config.getNumber('containerPort') ?? 80
const cpu = config.getNumber('cpu') ?? 512
const memory = config.getNumber('memory') ?? 128

// Create a new VPC
export const vpc = new awsx.ec2.Vpc('my-vpc', {
  numberOfAvailabilityZones: 2,
  natGateways: {
    strategy: awsx.ec2.NatGatewayStrategy.OnePerAz
  }
})

// An ECS cluster to deploy into
export const cluster = new aws.ecs.Cluster('cluster', {
  settings: [
    {
      name: 'containerInsights',
      value: 'enabled'
    }
  ]
})

// An ALB to serve the container endpoint to the internet
export const loadbalancer = new awsx.lb.ApplicationLoadBalancer('loadbalancer', {
  subnetIds: vpc.publicSubnetIds
})

// An ECR repository to store our application's container image
export const repo = new awsx.ecr.Repository('repo', {
  forceDelete: true
})

// Build and publish our application's container image from ./app to the ECR repository
export const image = new awsx.ecr.Image('image', {
  repositoryUrl: repo.url,
  context: './app',
  platform: 'linux/amd64'
})

// Deploy an ECS Service on Fargate to host the application container
export const service = new awsx.ecs.FargateService('service', {
  cluster: cluster.arn,
  networkConfiguration: {
    subnets: vpc.privateSubnetIds,
    assignPublicIp: true
  },
  taskDefinitionArgs: {
    container: {
      name: 'app',
      image: image.imageUri,
      cpu,
      memory,
      essential: true,
      portMappings: [
        {
          containerPort: containerPort,
          targetGroup: loadbalancer.defaultTargetGroup
        }
      ],
      logConfiguration: {
        logDriver: 'awslogs',
        options: {
          'awslogs-group': '/ecs/app',
          'awslogs-region': 'us-east-1',
          'awslogs-stream-prefix': 'ecs'
        }
      },
      healthCheck: {
        command: ['CMD-SHELL', 'curl -f http://localhost:80/health || exit 1'],
        interval: 30,
        timeout: 5,
        retries: 3,
        startPeriod: 60
      }
    }
  }
})

// The URL at which the container's HTTP endpoint will be available
export const url = pulumi.interpolate`http://${loadbalancer.loadBalancer.dnsName}`
