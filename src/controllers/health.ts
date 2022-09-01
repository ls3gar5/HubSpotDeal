import { Request, Response } from 'express';
import { isEmpty, each } from 'lodash';

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
