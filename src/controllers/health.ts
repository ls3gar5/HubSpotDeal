import { Request, Response } from 'express';
import { isEmpty, each } from 'lodash';
import { getListQueues, getURLQueue } from '../services/AWSservice';
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
  
  let  args: any = { test: '' };
  // args = { queryParams: { populate: entityToPopulate } };

  if (isEmpty(args))
   args = { queryParams: { populate: entityToPopulate } };
  else 
    args.queryParams.populate = entityToPopulate;

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
  
}

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
  
}


export const postmySns = async (req: Request, res: Response) => { 
  try {

    //let url: String = await getURLQueue();
    var todo = req.params;
    console.log('PASO POR ACA')
    return res.json({
      message: 'queues/mysns!!!'
    });

  } catch (error) {
    return res.json({
      message: error
    });
  }
  
}