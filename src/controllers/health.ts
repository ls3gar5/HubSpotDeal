import { isEmpty, each } from 'lodash';

export function getHealthCheck(req: any, res: any) {
  return res.json({
    message: 'ok!!!'
  });
}

export const getLodashTest = (req: any, res: any) => {
  const emptyObject: string = null;

  var isEmptyObject = isEmpty(emptyObject);

  const numbers = [1, 2, 3, 4];
  let listOfNumbers = '';
  each(numbers, (num: number) => {
    listOfNumbers += num + ' ';
  });

  return res.json({
    message: 'Is empty LALAL object =>' + isEmptyObject,
    listOfNumbers: listOfNumbers
  });
};

export const testJava = (args: any, res: any) => {
  const name = 'Carlos';

  const entityToPopulate = 'Deal,Firm,UserMetadata';

  if (isEmpty(res)) args = { queryParams: { populate: entityToPopulate } };
  else args.queryParams.populate = entityToPopulate;

  return res.json({
    TemplateLiterals: `Nombre: ${name}`
  });
};
