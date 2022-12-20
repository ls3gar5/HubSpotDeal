import { ExtractInstanceType, Keys, transportMap, TransportTypes } from "./transport"

export class TransportFactory {

    constructor() { }

    create(k: Keys): ExtractInstanceType<TransportTypes> { 

        // if(transportType === TransportType.truck) return new Truck();
        // if(transportType === TransportType.ship) return new Ship();
        
       return new transportMap[k]();
        
    }
}

export default TransportFactory;