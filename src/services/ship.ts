import { DataQueue, Domain, Entity, Transport } from "./transport"

export class Ship implements Transport {
    constructor() {
        
    }

    deliver(msg: string): DataQueue {
        return {
            domain: Domain.COMPLIANCE,
            createdAt: new Date(),
            data: [
              {
                entity: Entity.FORM,
                action: 'UPDATE',
                timeStamp: new Date(),
                previousEntityData: JSON.stringify(msg),
                entityData: JSON.stringify(msg)
              }
            ]
          };
    }
}