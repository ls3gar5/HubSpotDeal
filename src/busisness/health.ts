import Axios from 'axios';
import BadRequestError from '../../src/error/BadRequestError';
import { MyError } from "../../src/error/error";

class HeathBusisness {
    /**
     *
     */
    constructor() {
      console.log('Initiate fine!!')
    }

    public async getUrl(): Promise<void> {
        
        const start = new Date().getTime();
        const requestNumber = [1,2,3];
      
        // const [firstValue]  = requestNumber;
        // console.log(firstValue);

        const url = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80';

        const request = requestNumber.map(()=> Axios({
            method: 'GET',
            url: url,
            responseType: 'stream'
        }));

        try {
          const [resp1, resp2, resp3 ] = await Promise.all(request);
        } catch (error) {
          throw new BadRequestError(error.message);
        }
      
        const time =  (new Date().getTime() - start) / 1000;
        console.log(`FINSH at ${time} seconds`);
    }

    public add(arg1: number, arg2: number): number {
      return arg1 + arg2;
    }

    public callAdd(arg1: number, arg2: number): number {
      return this.add(arg1, arg2);
    }

    public callCallBackFunction(callbackfn: () => number): number{
      var result = callbackfn();
      return result;
    }

    public usePromise(): Promise<number>{
     var promise =  new Promise<number>((resolve, reject) => {
        setTimeout(() => resolve(1), 3000);
      }).then((result) => {
        return result * 2;
      });

      return promise;
    }

 }

const fileBusisness = new HeathBusisness();
export default fileBusisness;