#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EcrVpcEndpointDemoStack } from '../lib/ecr-vpc-endpoint-demo-stack';

const app = new cdk.App();
new EcrVpcEndpointDemoStack(app, 'EcrVpcEndpointDemoStack', {
    env: { region: 'us-west-2' }
});
