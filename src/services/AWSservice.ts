// Load the AWS SDK for Node.js
import AWS, { AWSError, SQS, SNS } from 'aws-sdk';

export type Config = {
  endpoint: AWS.Endpoint;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
};

const setConfig = (): Config => {
  const AWSConfig: Config = {
    endpoint: new AWS.Endpoint('http://localhost:4566'),
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: ''
  };
  return AWSConfig;
};

AWS.config.update(setConfig());

export const getListQueues = async (): Promise<String[]> => {
  // Set the region
  // AWS.config.update(setConfig());
  // Create an SQS service object
  var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
  var params = {};

  let list: string[] = await new Promise((resolve, reject) => {
    sqs.listQueues(params, (err: AWSError, data: SQS.Types.ListQueuesResult) => {
      if (err) {
        console.log('Error', err);
        reject(err);
      } else {
        console.log('Success', data.QueueUrls);
        resolve(data.QueueUrls);
      }
    });
  });

  return list;
};

export const getURLQueue = async (): Promise<String> => {
  // Set the region
  //AWS.config.update(setConfig());

  // Create an SQS service object
  var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

  var params = {
    QueueName: 'onexlab'
  };

  let url: string = await new Promise((resolve, reject) => {
    sqs.getQueueUrl(params, (err: AWSError, data: SQS.Types.GetQueueUrlResult) => {
      if (err) {
        console.log('Error', err);
        reject(err);
      } else {
        console.log('Success', data.QueueUrl);
        resolve(data.QueueUrl);
      }
    });
  });

  return url;
};

export const createQueue = async (queueName: String) => {
    var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
    const params: SQS.Types.CreateQueueRequest= {
        QueueName: 'sqs-test.fifo'
        // Attributes: {
        //     MessageRetentionPeriod: '',
        //     VisibilityTimeout: '30'
        // }
    };

    sqs.createQueue(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });

};


export const getSNSListQueues = async (): Promise<void> => {
  var topicArn = ''; // tiene q estar en la env 
  var sqs = new SNS();

  
  
}
