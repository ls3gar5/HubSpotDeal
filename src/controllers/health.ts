import { Request, Response, NextFunction } from 'express';
import { isEmpty, each, get } from 'lodash';
import { getListQueues, getURLQueue } from '../services/AWSservice';
import Axios from 'axios';
import { MESSAGE } from '../../src/types/message';
import { IsJsonString } from '../../src/crosscutting/stringExtention/jsonValidation';

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
  const name = 'Carlos';

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
