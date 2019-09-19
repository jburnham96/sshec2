# sshec2

Small utility that lists out all ec2 instances running in aws, allowing you to select an instance and SSH into it.

## Getting Started / Prerequisites

In order to run this utility you need to have two items set up:
1. ssh key set up. This currently defaults to ```~/.ssh/aws.key``` but can be modified within the config ```/etc/sshec2.conf```
2. the AWS cli installed and [configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html). 
**Note:** Set your default output to JSON when configuring for the first time.

### Installing  

#### Ubuntu:
- Download the latest .deb [release](https://github.com/jburnham96/sshec2/releases)
- Install:
``` 
sudo apt install ./sshec2-<release>.deb
sudo dpkg -i ./sshec2-<release>.deb
```

### Usage
Type sshec2, by default all ec2 instances will be listed. Find the instance you want to connect to and type in the number. SSH will begin, automatically accepting the certificate.

## Built With

* [AWS CLI](https://docs.aws.amazon.com/cli/) - Gets all the information for ec2 instances
* [JQ](https://stedolan.github.io/jq/) - flexible command-line JSON processor for extracting aws cli output

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
