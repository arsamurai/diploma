import { ObjectId } from "mongoose";
import { BasketItem } from "src/basket/schemas/basketItem.schema";

export class AddHistoryDto {
  readonly userId: ObjectId;
  readonly devices: any[];
}