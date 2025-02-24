import { Model } from 'sequelize-typescript';
import { Buyer } from 'src/buyers/entities/buyer.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
export declare class Order extends Model {
    date: string;
    buyerId: number;
    buyer: Buyer;
    discount: string;
    totalAmount: string;
    day: number;
    month: number;
    year: number;
    inventoryId: number;
    inventory: Inventory;
}
