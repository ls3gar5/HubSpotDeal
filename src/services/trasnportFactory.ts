import { ExtractInstanceType, TransportEnumType, transportMap, TransportTypes } from './transport';

export class TransportFactory {
  constructor() {}

  create(transport: TransportEnumType): ExtractInstanceType<TransportTypes> {
    // if(transportType === TransportType.truck) return new Truck();
    // if(transportType === TransportType.ship) return new Ship();
    const factoryClass = transportMap[transport];
    return new factoryClass();
  }
}

export default TransportFactory;
