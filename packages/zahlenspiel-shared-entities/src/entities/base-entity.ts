export type CardEntity = "card";
export type CardStackEntity = "card-stack";
export type PlayerEntity = "player";
export type EntityType = CardEntity | CardStackEntity | PlayerEntity;

export abstract class BaseEntity {
    abstract type: EntityType;
}