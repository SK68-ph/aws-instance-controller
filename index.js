const express = require('express');
const path = require('path');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

// Load environment variables
require('dotenv').config();

// Set the instance ID
const instanceId = "i-0d4e4d590bac81179";

// Configure the AWS SDK
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

AWS.config.update({
  accessKeyId: "AKIA2X3IJDR5AS5WTL45",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});

// Create an instance of the EC2 service
const ec2 = new AWS.EC2();

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Start instance route
app.get('/startInstance', async (req, res) => {
  const params = {
    InstanceIds: [instanceId],
  };
  try {
    await ec2.startInstances(params).promise();
    res.send('Instance started successfully!');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get instance IP address route
app.get('/instanceIpAddress', async (req, res) => {
  const params = {
    InstanceIds: [instanceId],
  };
  try {
    const result = await ec2.describeInstances(params).promise();
    const ipAddress = result.Reservations[0].Instances[0].PublicIpAddress;
    res.send(ipAddress);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Stop instance route
app.get('/stopInstance', async (req, res) => {
  const params = {
    InstanceIds: [instanceId],
  };
  try {
    await ec2.stopInstances(params).promise();
    res.send('Instance stopped successfully!');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get instance status route
app.get('/instanceStatus', async (req, res) => {
  const params = {
    InstanceIds: [instanceId],
  };
  try {
    const result = await ec2.describeInstances(params).promise();
    const status = result.Reservations[0].Instances[0].State.Name;
    res.send(`Instance status: ${status}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
