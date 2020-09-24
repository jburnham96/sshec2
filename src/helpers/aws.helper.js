/* eslint-disable no-await-in-loop */
const { v4: uuidv4 } = require("uuid");
const electron = require("electron");
const AWS = electron.remote.require("aws-sdk");

export default class AwsHelper {
  constructor(region) {
    this.instances = [];

    AWS.config.httpOptions.timeout = 5000;
    AWS.config.update({ region });
  }

  static async getRegions() {
    const ec2 = new AWS.EC2();

    const availableRegions = await ec2.describeRegions().promise();

    return availableRegions
      ? availableRegions.Regions.map((region) => region.RegionName)
      : [];
  }

  async getAllResources() {
    await this.populateLightsailInstances();
    await this.populateEc2Instances();
    await this.populateEcsTasks();

    return this.instances;
  }

  async populateLightsailInstances() {
    const lightsail = new AWS.Lightsail();

    const lightsailInstances = await lightsail
      .getInstances()
      .promise()
      .catch((err) => {
        console.log(err);
      });

    if (!lightsailInstances) return;

    lightsailInstances.instances.forEach((instance) => {
      if(instance.state.code === 16) {
        this.instances.push({
          id: uuidv4(),
          type: "Lightsail",
          name: instance.name,
          targetIp: instance.publicIpAddress,
        });
      }
    });
  }

  async populateEc2Instances() {
    const ec2 = new AWS.EC2();

    const ec2Instances = await ec2
      .describeInstances()
      .promise()
      .catch((err) => {
        console.log(err);
      });

    if (!ec2Instances) return;

    ec2Instances.Reservations.forEach((reservation) => {
      reservation.Instances.forEach((instance) => {
        const name = instance.Tags.filter((tag) => tag.Key === "Name")[0]
          ? instance.Tags.filter((tag) => tag.Key === "Name")[0].Value
          : instance.InstanceId;

        if (instance.State.Code === 16) {
          this.instances.push({
            id: uuidv4(),
            type: "EC2",
            name,
            targetIp: instance.PublicIpAddress,
            instanceId: instance.InstanceId,
          });
        }
      });
    });
  }

  async populateEcsTasks() {
    const ecs = new AWS.ECS();

    const clusterArns = await ecs
      .listClusters()
      .promise()
      .catch((err) => {
        console.log(err);
      });

    if (!clusterArns) return;

    const clustersDetails = await ecs
      .describeClusters({
        clusters: clusterArns.clusterArns,
      })
      .promise()
      .catch((err) => {
        console.log(err);
      });

    if (!clustersDetails) return;
    for (let i = 0; i < clustersDetails.clusters.length; i += 1) {
      const curCluster = clustersDetails.clusters[i];

      const containerInstanceArns = await ecs
        .listContainerInstances({
          cluster: curCluster.clusterArn,
        })
        .promise()
        .catch((err) => {
          console.log(err);
        });

      if (containerInstanceArns.containerInstanceArns.length <= 0) return;

      const containerInstanceDescriptions = await ecs
        .describeContainerInstances({
          cluster: curCluster.clusterArn,
          containerInstances: containerInstanceArns.containerInstanceArns,
        })
        .promise()
        .catch((err) => {
          console.log(err);
        });

      const containerEc2Mapping = containerInstanceDescriptions.containerInstances.map(
        (instance) => ({
          containerInstanceArn: instance.containerInstanceArn,
          mappedInstance: this.instances.filter(
            (x) => x.instanceId === instance.ec2InstanceId
          )[0],
        })
      );

      const tasksArns = await ecs
        .listTasks({
          cluster: curCluster.clusterArn,
        })
        .promise()
        .catch((err) => {
          console.log(err);
        });

      const tasks = await ecs
        .describeTasks({
          tasks: tasksArns.taskArns,
          cluster: curCluster.clusterArn,
        })
        .promise()
        .catch((err) => {
          console.log(err);
        });

      if (tasks) {
        for (let j = 0; j < tasks.tasks.length; j += 1) {
          const curTask = tasks.tasks[j];

          this.instances.push({
            id: uuidv4(),
            type: "ECS - Task",
            name: curTask.group.split(":").pop(),
            targetIp: containerEc2Mapping.filter(
              (mapping) =>
                mapping.containerInstanceArn === curTask.containerInstanceArn
            )[0].mappedInstance.targetIp,
            clusterName: curCluster.clusterName,
          });
        }
      }
    }
  }
}
