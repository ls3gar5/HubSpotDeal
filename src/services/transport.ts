export const enum TransportType {
    truck= "Truck",
    ship= "Ship"
}

export const enum DOMAIN {
    COMPLIANCE = 'compliance'
}
  
export const enum ENTITY {
    FORM = 'Form',
    NOTES = 'Notes',
    REVIEWER = 'Reviewer',
    NOTEATTACHMENT = 'NoteAttachment'
}
  
export type DataEntity = {
    entity: ENTITY;
    action: string;
    timeStamp: Date;
    previousEntityData: string;
    entityData: string;
};

export type DataQueue = {
    domain: DOMAIN;
    createdAt: Date;
    data: DataEntity[];
};

export interface Transport {
    deliver(msg: string): DataQueue;
}

export interface TransportCreateFactory {
    create(transportType: TransportType): Transport;
}

