import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'
import * as path from 'path'

const config = new pulumi.Config()

const containerPort = config.getNumber('containerPort') ?? 4000
const cpu = config.getNumber('cpu') ?? 512
const memory = config.getNumber('memory') ?? 128

// Cria uma nova VPC
const vpc = new aws.ec2.Vpc('myVpc', {
  cidrBlock: '10.0.0.0/16',
  enableDnsSupport: true,
  enableDnsHostnames: true,
  tags: {
    Name: 'myVpc',
  },
})

// Cria uma sub-rede na VPC
const subnet = new aws.ec2.Subnet('mySubnet', {
  vpcId: vpc.id,
  cidrBlock: '10.0.1.0/24',
  availabilityZone: 'us-east-1',
  tags: {
    Name: 'mySubnet',
  },
})

// Cria um Internet Gateway
const igw = new aws.ec2.InternetGateway('myInternetGateway', {
  vpcId: vpc.id,
})

// Cria uma tabela de rotas
const routeTable = new aws.ec2.RouteTable('myRouteTable', {
  vpcId: vpc.id,
  routes: [
    {
      cidrBlock: '0.0.0.0/0',
      gatewayId: igw.id,
    },
  ],
  tags: {
    Name: 'myRouteTable',
  },
})

// Associa a tabela de rotas à sub-rede
const routeTableAssociation = new aws.ec2.RouteTableAssociation('myRouteTableAssociation', {
  subnetId: subnet.id,
  routeTableId: routeTable.id,
})

// An ECS cluster to deploy into
const cluster = new aws.ecs.Cluster('cluster', {})

// An ALB to serve the container endpoint to the internet
const loadbalancer = new awsx.lb.ApplicationLoadBalancer('loadbalancer', {})

// An ECR repository to store our application's container image
const repo = new awsx.ecr.Repository('repo', {
  forceDelete: true,
})

// Build and publish our application's container image from ./app to the ECR repository
const image = new awsx.ecr.Image('image', {
  repositoryUrl: repo.url,
  context: path.join(__dirname, '../../'),
  dockerfile: path.resolve(__dirname, '../../Dockerfile.api'),
  platform: 'linux/amd64',
})

// Deploy an ECS Service on Fargate to host the application container
export const service = new awsx.ecs.FargateService('service', {
  cluster: cluster.arn,
  assignPublicIp: true,
  taskDefinitionArgs: {
    container: {
      name: 'app',
      image: image.imageUri,
      cpu: cpu,
      memory: memory,
      essential: true,
      portMappings: [
        {
          containerPort: containerPort,
          targetGroup: loadbalancer.defaultTargetGroup,
        },
      ],
      healthCheck: {
        command: ['CMD-SHELL', `curl -f http://localhost:${containerPort}/health || exit 1`],
        interval: 30,
        timeout: 5,
        retries: 3,
        startPeriod: 150,
      },
    },
  },
  networkConfiguration: {
    subnets: [subnet.id],
    securityGroups: [],
  },
})

// The URL at which the container's HTTP endpoint will be available
export const url = pulumi.interpolate`http://${loadbalancer.loadBalancer.dnsName}`
