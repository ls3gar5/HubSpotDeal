import { DataQueue, DOMAIN, ENTITY, Transport } from "./transport"

export class Truck implements Transport {
    constructor() {}

    deliver(msg: string): DataQueue {
        return {
            domain: DOMAIN.COMPLIANCE,
            createdAt: new Date(),
            data: [
              {
                entity: ENTITY.FORM,
                action: 'CREATE',
                timeStamp: new Date(),
                previousEntityData: JSON.stringify(msg),
                entityData: JSON.stringify(msg)
              }
            ]
          };
    }
}