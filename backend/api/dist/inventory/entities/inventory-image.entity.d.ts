import { Model } from 'sequelize-typescript';
import { Inventory } from './inventory.entity';
export declare class InventoryImage extends Model {
    inventoryId: number;
    inventory: Inventory;
    path: string;
    description: string;
    type: string;
}
