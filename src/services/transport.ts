import { Ship } from "./ship";
import { Truck } from "./truck";

export const enum TransportEnumType {
    truck= "truck",
    ship= "ship"
}

export const enum Domain {
    COMPLIANCE = 'compliance'
}
  
export const enum Entity {
    FORM = 'Form',
    NOTES = 'Notes',
    REVIEWER = 'Reviewer',
    NOTEATTACHMENT = 'NoteAttachment'
}
  
export type DataEntity = {
    entity: Entity;
    action: string;
    timeStamp: Date;
    previousEntityData: string;
    entityData: string;
};

export type DataQueue = {
    domain: Domain;
    createdAt: Date;
    data: DataEntity[];
};

export interface Transport {
    deliver(msg: string): DataQueue;
}

export interface TransportCreateFactory {
    create(transportType: TransportEnumType): Transport;
}
export const transportMap = {
    [TransportEnumType.truck]: Truck,
    [TransportEnumType.ship]: Ship
}

export type TransportTypes = typeof transportMap[TransportEnumType];

export type ExtractInstanceType<T> = T extends new () => infer R ? R : never;
