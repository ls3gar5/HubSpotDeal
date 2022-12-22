import { Request, Response, NextFunction } from 'express';
import { isEmpty, each, get, keys } from 'lodash';
import { getListQueues, getURLQueue } from '../services/AWSservice';
import Axios from 'axios';
import { MESSAGE } from '../../src/types/message';
import { IsJsonString } from '../../src/crosscutting/stringExtention/jsonValidation';
import amqp from 'amqplib';
import TransportFactory from '../services/trasnportFactory';
import { TransportEnumType } from '../services/transport';

export function getHealthCheck(req: any, res: any) {
  return res.json({
    message: 'ok!!!'
  });
}

export const getLodashTest = (req: Request, res: Response) => {
  const emptyObject: string = null;

  var isEmptyObject = isEmpty(emptyObject);

  const numbers = [1, 2, 3, 4];
  let listOfNumbers = '';
  each(numbers, (num: number) => {
    listOfNumbers += num + ' ';
  });

  return res.json({
    message: 'Is empty object =>' + isEmptyObject,
    listOfNumbers: listOfNumbers
  });
};

export const testJava = (req: Request, res: Response) => {
  const transportDeliver = new TransportFactory();
  const truck = transportDeliver.create(TransportEnumType.ship);
  const result = truck.deliver("What you see is waht you have!!");
  console.log(result);

  const deliveryTag = 11;
  const parsedMessage = 'Lalala';
  const notificationErrorMessage = 'Esto no funca!!!';

  const testMessage = {
    event: 'DCR_FORM_CREATE_PROCESS_ERROR',
    details: `Current message number ${deliveryTag}: ${parsedMessage} - Parse/DataBase Error: ${notificationErrorMessage}`
  };

  console.log(testMessage);

  console.log(JSON.stringify(testMessage));

  const object1 = {
    name: 'somestring',
    edge: 42
  };
  console.log('Object.entries(object1)', Object.entries(object1));
  for (const [key, value] of Object.entries(object1)) {
    console.log(`${key}: ${value}`);
  }

  // const users: string = '{\"updatedRecord\":{\"id\":\"bf0eb206-ec56-11e9-81b4-2a2ae2dbcce5\",\"name\":\"ILL BE BACK II NAAAA\",\"type\":\"M_N_A\",\"companyName\":\"Facebook\",\"companyAddress\":\"Menlo Park, CA 94025\",\"companyAgent\":\"Mark Zuckerberg\",\"ownerId\":\"7c38e9d6-ee8d-11e9-834b-2a2ae2dbcce4\",\"mode\":\"regular\",\"projectName\":\"\",\"private\":true,\"status\":true,\"createdAt\":\"2022-10-24T17:14:59.247Z\",\"updatedAt\":\"2022-11-03T14:18:34.245Z\",\"DealOwner\":{\"id\":\"7c38e9d6-ee8d-11e9-834b-2a2ae2dbcce4\",\"firstName\":\"Dean\",\"lastName\":\"Donovan\",\"email\":\"ddonovan@foleman.com\",\"isCustomer\":true,\"platformRole\":\"user\",\"preferences\":{\"maxDealCreation\":5},\"active\":true,\"totpKey\":null,\"lastLoginAt\":\"2022-11-02T19:19:00.872Z\",\"prospectId\":null,\"displayName\":\"\",\"createdAt\":\"2022-10-24T17:14:58.290Z\",\"updatedAt\":\"2022-11-02T19:19:00.876Z\",\"deletedAt\":null},\"UserDeal\":{}},\"previousRecord\":{\"id\":\"bf0eb206-ec56-11e9-81b4-2a2ae2dbcce5\",\"name\":\"ILL BE BACK II\",\"type\":\"M_N_A\",\"companyName\":\"Facebook\",\"companyAddress\":\"Menlo Park, CA 94025\",\"companyAgent\":\"Mark Zuckerberg\",\"ownerId\":\"7c38e9d6-ee8d-11e9-834b-2a2ae2dbcce4\",\"mode\":\"regular\",\"projectName\":\"\",\"private\":true,\"status\":true,\"createdAt\":\"2022-10-24T17:14:59.247Z\",\"updatedAt\":\"2022-11-03T14:17:03.581Z\",\"DealOwner\":{\"id\":\"7c38e9d6-ee8d-11e9-834b-2a2ae2dbcce4\",\"firstName\":\"Dean\",\"lastName\":\"Donovan\",\"email\":\"ddonovan@foleman.com\",\"isCustomer\":true,\"platformRole\":\"user\",\"preferences\":{\"maxDealCreation\":5},\"active\":true,\"totpKey\":null,\"lastLoginAt\":\"2022-11-02T19:19:00.872Z\",\"prospectId\":null,\"displayName\":\"\",\"createdAt\":\"2022-10-24T17:14:58.290Z\",\"updatedAt\":\"2022-11-02T19:19:00.876Z\",\"deletedAt\":null}},\"action\":\"update\",\"dataBase\":\"Users\",\"entity\":\"Deal\",\"entityId\":\"bf0eb206-ec56-11e9-81b4-2a2ae2dbcce5\",\"updatedBy\":null,\"updatedAt\":\"2022-11-03T14:18:34.258Z\",\"impersonate\":{\"userId\":\"\",\"date\":\"1700-02-25T00:00:00.000Z\"}}';

  // const userList = JSON.parse(users);
  // const result = Date.now();
  // const newDate = (new Date(result)).toISOString();

  // const  verduras: string[] = ['patata', 'puerro', 'papa'];
  // //const firstPosition = verduras.at(0);
  // verduras.forEach((vegettable) => {
  //   console.log(vegettable);
  // });

  // verduras.map((veege) =>{
  //   console.log(`Verdura: ${veege}`);
  // });

  // const datePP = new Date("2022-09-16T19: 39:54.241Z");
  // const datePP2 = Date.parse("2022- 09-16T19: 39:54.241Z");

  const data = {
    action: 'update',
    dataBase: 'Users',
    entity: 'Users',
    entityId: 'bf0eb206-ec56-11e9-81b4-2a2ae2dbcce4',
    updatedBy: '5199e37e-ee8d-11e9-81b4-2a2ae2dbcce4',
    updatedAt: '2022-09-16T19:39:54.241Z',
    previousRecord: { firstName: 'Pepe 1' },
    updatedRecord: { firstName: 'Pepe 2' },
    impersonate: {
      userId: '5199e37e-ee8d-11e9-81b4-2a2ae2dbcce4',
      date: '2022-09-16T19:39:54.241Z'
    }
  };
  const jsonS =
    '{"action":"update","dataBase":"Users","entity":"Users","entityId":"bf0eb206-ec56-11e9-81b4-2a2ae2dbcce4","updatedBy":"5199e37e-ee8d-11e9-81b4-2a2ae2dbcce4","updatedAt":"2022-09-16T19:39:54.241Z","previousRecord":{"firstName":"Pepe 1"},"updatedRecord":{"firstName":"Pepe 2"},"impersonate":{"userId":"5199e37e-ee8d-11e9-81b4-2a2ae2dbcce4","date":"2022-09-16T19:39:54.241Z"}}';
  // const str = '"{\"action\": \"update\",\"dataBase\": \"Users\",\"entity\": \"Users\",\"entityId\": \"bf0eb206-ec56-11e9-81b4-2a2ae2dbcce4\",\"updatedBy\": \"5199e37e-ee8d-11e9-81b4-2a2ae2dbcce4\",\"updatedAt\": \"2022-09-16T19:39:54.241Z\",\"previousRecord\":{\"firstName\": \"Pepe 1\"},\"updatedRecord\": {\"firstName\": \"Pepe 2\"},\"impersonate\": {\"userId\": \"5199e37e-ee8d-11e9-81b4-2a2ae2dbcce4\",\"date\": \"2022-09-16T19:39:54.241Z\"}}"'
  const obj = JSON.parse(jsonS);
  // const result = Object.fromEntries(data);

  // console.log(result);
  // expected output: Object { foo: "bar", baz: 42 }
  const name = req.params.name;
  const test1 = name === undefined ? 'Is undefined' : 'NOT';
  const test2 = isEmpty(name) ? 'Is Empty' : 'NOT';

  const entityToPopulate = 'Deal,Firm,UserMetadata';

  let args: any = { test: '' };
  args = { queryParams: { populate: entityToPopulate } };

  if (isEmpty(args)) args = { queryParams: { populate: entityToPopulate } };
  else args.queryParams.populate = entityToPopulate;

  return res.json({
    TemplateLiterals: `Nombre: ${name}`
  });
};

export const getAWSListQueues = async (req: Request, res: Response) => {
  try {
    let list: String[] = await getListQueues();

    return res.json({
      message: 'DONE!!!',
      list: list
    });
  } catch (error) {
    return res.json({
      message: error
    });
  }
};

export const getAWSUrlQueue = async (req: Request, res: Response) => {
  try {
    let url: String = await getURLQueue();

    return res.json({
      message: 'DONE!!!',
      url: url
    });
  } catch (error) {
    return res.json({
      message: error
    });
  }
};

/**
 * Proccess message type NOTIFICATION with FILTER 'audit'
 * @str string message
 * @returns is we can parse to JSON
 */
export const postMessage = async (req: any, res: Response) => {
  // interface LooseObject {
  //   [key: string]: any;
  // }

  // var obj: LooseObject = {};
  // obj.pp = 1;

  // var objTest: Record<string,any> = {}
  // objTest.asasa= 1;

  // var obj:any = {}
  // obj.prop = 5;
  // obj.prop2 = "Leo";
  // console.log(obj.propa)

  console.log('!!!!!START');
  var messageType = req.header('x-amz-sns-message-type');
  if (messageType && messageType !== MESSAGE.NOTIFICATION) {
    return res.json({
      message: 'NOTIFICATION ERROR!!!'
    });
  }

  var { body } = req;
  var bodyJson = JSON.parse(body);
  console.log(bodyJson);

  if (bodyJson.Type == MESSAGE.NOTIFICATION) {
    console.log('====>>> NOTIFICATION START!!!!!');

    if (IsJsonString(bodyJson.Message)) {
      console.log(JSON.parse(bodyJson.Message));
    } else {
      console.log(bodyJson.Message);
    }

    //GRABAR EN LA BASE DE DATOS
    console.log('NOTIFICATION PROCESS IN MONGO!!!!!');
  }
  return res.json({
    message: 'NOTIFICATION PROCESS '
  });
};

export const getSuscriptionUnsubscribeConfirm = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  console.log('!!!!!START getSuscriptionUnsubscribeConfirm');

  var messageType = req.header('x-amz-sns-message-type');
  if (
    !isEmpty(messageType) &&
    !(
      messageType == MESSAGE.SUBSCRIPTIONCONFIRMATION ||
      messageType == MESSAGE.UNSUBSCRIBECONFIRMATION
    )
  ) {
    console.log('NEXT TO NOTIFICATION');
    return next();
  }

  try {
    var { body } = req;
    var bodyJson = JSON.parse(body);
    var subscribeURL = get(bodyJson, 'SubscribeURL');
    console.log(subscribeURL);

    if (subscribeURL) new Error('No exist subscribe / unsubscribe URL');

    const response = await Axios({
      method: 'GET',
      url: subscribeURL,
      responseType: 'json'
    });

    if (response.status == 200) {
      console.log('SUBSCRIPTIONCONFIRMATION STATUS 200!!!!!');
      return res.status(200).json({
        message: 'SUBSCRIPTIONCONFIRMATION DONE!'
      });
    } else {
      console.log(`SUBSCRIPTIONCONFIRMATION INCORRECT!!!!! STATUS CODE: ${response.status}`);
      return res.status(response.status).json({
        message: `SUBSCRIPTIONCONFIRMATION INCORRECT!!!!! STATUS CODE: ${response.status}`
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `SUBSCRIPTIONCONFIRMATION INCORRECT! - Error: ${error.message}`
    });
  }
};

export const producedRabbitMQ = async (req: any, res: Response) => {
  const isSended = await producer();

  res.json(`Message sended: ${isSended}`);
};

const rabbitSetting = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'rabbit',
  password: 'password',
  vhost: '/'
};

const producer = async (): Promise<Boolean> => {
  const queue = 'employees';
  const msg = { firstName: 'Pepe 2' };

  try {
    // CREATE A CONNECTION
    const connect = await amqp.connect(rabbitSetting);
    console.log('Connection Created...');

    //CREATE A CHANNEL
    const channel = await connect.createChannel();
    console.log('Channel Created...');

    // CREATE QUEUE IF NOT EXIST
    await channel.assertQueue(queue);

    const publishMSG = await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));

    return publishMSG;
  } catch (error) {
    console.error(error);
  }
};

const consumer = async (): Promise<string> => {
  const queue = 'employees';
  const msg = { firstName: 'Pepe 2' };

  try {
    // CREATE A CONNECTION
    const connect = await amqp.connect(rabbitSetting);
    console.log('Connection Created...');

    //CREATE A CHANNEL
    const channel = await connect.createChannel();
    console.log('Channel Created...');

    // CREATE QUEUE IF NOT EXIST
    await channel.assertQueue(queue);

    console.log('Waiting for messages... ');
    let message = '';
    channel.consume(queue, (currentMsj) => {
      message = JSON.parse(currentMsj.content.toString());
      console.log(message);
      channel.ack(currentMsj);
      channel.nack(currentMsj);
    });

    return message;
  } catch (error) {
    console.error(error);
  }
};
export const consumerRabbitMQ = async (req: any, res: Response) => {
  const msg = await consumer();

  //res.json(`Message recived: ${msg}`);
};

export const destructuring = async (req: any, res: Response) => {
  const start = new Date().getTime();
  const requestNumber = [1,2,3];
  const [firstValue]  = requestNumber;
  console.log(firstValue);
  const url =
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80';

  const request = requestNumber.map(()=>  Axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  }));

  const [resp1, resp2, resp3 ] = await Promise.all(request);

  console.log((new Date().getTime() - start) / 1000, ' seconds');
  console.log('FINSH');
  return res.json('Okis');
};
