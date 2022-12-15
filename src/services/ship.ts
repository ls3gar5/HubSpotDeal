import { DataQueue, DOMAIN, ENTITY, Transport } from "./transport"

export class Ship implements Transport {
    constructor() {
        
    }

    deliver(msg: string): DataQueue {
        return {
            domain: DOMAIN.COMPLIANCE,
            createdAt: new Date(),
            data: [
              {
                entity: ENTITY.FORM,
                action: 'UPDATE',
                timeStamp: new Date(),
                previousEntityData: JSON.stringify(msg),
                entityData: JSON.stringify(msg)
              }
            ]
          };
    }
}