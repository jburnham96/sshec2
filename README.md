
# sshec2
Small command line utility that lists out all ec2 instances running in aws, allowing you to select an instance and SSH into it.
## Getting Started / Prerequisites
In order to run this utility you need to have two items set up:
1. ssh key set up. This currently defaults to ```~/.ssh/aws.key``` but can be modified within the config which is located at: ```/etc/sshec2.conf```
2. the AWS cli installed and [configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html). (this will be installed as a dependency, so will just need configuring once sshec2 is installed)
**Note:** Set your default output to JSON when configuring for the first time.
### Installing  
#### Ubuntu:
- [Download](https://github.com/jburnham96/sshec2/releases) the latest .deb release
```
wget https://github.com/jburnham96/sshec2/releases/download/1.0.2/sshec2<version>.deb
```
- Install:
``` 
sudo apt install ./sshec2-<release>.deb
```
If this is the first time you're using the AWS CLI you'll need to run through the configuration. With your public & private access key,  default region and default export type. Run the configuration with:
```aws configure```
#### Windows:
[Install the linux subsytem for windows](https://docs.microsoft.com/en-us/windows/wsl/install-win10)  and run the steps above as normal.
### Usage
Type sshec2, by default all ec2 instances will be listed. Find the instance you want to connect to and type in the number. SSH will begin, automatically accepting the certificate.
## Configuration
There is a sshec2.config located at ```/etc/sshec2.conf``` which you can specify which clusters you would like to include. Adding to this will exclude any clusters that aren't included. If you leave this blank then all EC2 instances will be displayed.
## Built With
* [AWS CLI](https://docs.aws.amazon.com/cli/) - Gets all the information for ec2 instances
* [JQ](https://stedolan.github.io/jq/) - flexible command-line JSON processor for extracting aws cli output
## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
