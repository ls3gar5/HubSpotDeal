import { DataQueue, Domain, Entity, Transport } from "./transport"

export class Truck implements Transport {
    constructor() {}

    deliver(msg: string): DataQueue {
        return {
            domain: Domain.COMPLIANCE,
            createdAt: new Date(),
            data: [
              {
                entity: Entity.FORM,
                action: 'CREATE',
                timeStamp: new Date(),
                previousEntityData: JSON.stringify(msg),
                entityData: JSON.stringify(msg)
              }
            ]
          };
    }
}