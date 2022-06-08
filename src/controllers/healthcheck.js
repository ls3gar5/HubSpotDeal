import {isEmpty, each} from 'lodash';

export function getHealthCheck(req, res) {

    return res.json({
        message: 'ok!!!'
    });
}


export const getLodashTest = (req, res) => {

    const emptyObject = null;

    var isEmptyObject = isEmpty(emptyObject);

    var numbers = [1,2,3,4];
    var listOfNumbers = '';
    each(numbers,function(num) { listOfNumbers += num + ' '})

    return res.json({
        message: 'Is empty object =>' + isEmptyObject,
        listOfNumbers: listOfNumbers
    });
}