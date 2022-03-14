#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkAwsStack } from '../lib/cdk_aws-stack';

const app = new cdk.App();
new CdkAwsStack(app, 'CdkAwsStack');
