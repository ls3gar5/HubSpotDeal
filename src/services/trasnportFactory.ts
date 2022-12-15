import { Transport, TransportCreateFactory, TransportType } from "./transport"
import { Truck } from "./truck"
import { Ship } from "./ship"

export class TransportFactory implements TransportCreateFactory {

    constructor() { }

    create(transportType: TransportType): Transport { 
        if(transportType === TransportType.truck) return new Truck();
        if(transportType === TransportType.ship) return new Ship();
    }
}

export default TransportFactory;