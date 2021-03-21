import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';

export class EcrVpcEndpointDemoStack extends cdk.Stack {
  readonly vpc: ec2.IVpc;
  readonly bastion: ec2.IInstance;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, 'vpc');

    // uncomment the following lines to enable VPC endpoints
    //
    // this.addInterfaceEndpoint('ecr.api');
    // this.addInterfaceEndpoint('ecr.dkr');
    // this.addGatewayEndpoint('s3');

    this.bastion = this.createBastionHost();
  }

  addInterfaceEndpoint(service: string, port: number = 443) {
    this.vpc.addInterfaceEndpoint(service, {
      service: {
        name: `com.amazonaws.${cdk.Aws.REGION}.${service}`,
        port,
      },
    });
  }

  addGatewayEndpoint(service: string) {
    this.vpc.addGatewayEndpoint(service, {
      service: {
        name: `com.amazonaws.${cdk.Aws.REGION}.${service}`,
      },
    });
  }

  createBastionHost(): ec2.IInstance {
    const userData = ec2.UserData.forLinux();
    const dockerInstallCmd = 'sudo yum update -y && sudo amazon-linux-extras install docker -y && sudo service docker start';
    userData.addCommands(dockerInstallCmd);

    const bastion = new ec2.BastionHostLinux(this, 'bastion', {
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
        userData,
       }),
      vpc: this.vpc,
    });

    const ecrFullAccess = iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryFullAccess');
    bastion.role.addManagedPolicy(ecrFullAccess);

    return bastion;
  }
}
