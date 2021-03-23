# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Setup environment
* Install `node` & `npm`
```sh
brew update
brew install node
```

* Install cdk
```sh
npm install -g cdk
```

* Install session manager plugin ([instructions](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html))
```sh
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/mac/sessionmanager-bundle.zip" -o "sessionmanager-bundle.zip"
unzip sessionmanager-bundle.zip
sudo ./sessionmanager-bundle/install -i /usr/local/sessionmanagerplugin -b /usr/local/bin/session-manager-plugin
```


## Synthesize stack
```sh
# export the credentials for the AWS account you'd like to use
$> npm run build && cdk deploy
```

## Connect to instance

```sh
$> aws ssm start-session --target <instance id>
```

## Test VPC endpoints

Check the DNS resolution for the ECR API endpoint (with VPC endpoints):
```sh
$> dig api.ecr.us-west-2.amazonaws.com

; <<>> DiG 9.11.4-P2-RedHat-9.11.4-26.P2.amzn2.4 <<>> api.ecr.us-west-2.amazonaws.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 54029
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;api.ecr.us-west-2.amazonaws.com. IN	A

;; ANSWER SECTION:
api.ecr.us-west-2.amazonaws.com. 60 IN	A	10.0.178.17
api.ecr.us-west-2.amazonaws.com. 60 IN	A	10.0.221.18

;; Query time: 2 msec
;; SERVER: 10.0.0.2#53(10.0.0.2)
;; WHEN: Mon Mar 22 18:56:22 UTC 2021
;; MSG SIZE  rcvd: 81
```

## Enable ssm-user to access docker socket
```sh
$> sudo usermod -a -G docker ssm-user
$> exec bash # start a new shell to refresh group membership
$> docker ps
```

