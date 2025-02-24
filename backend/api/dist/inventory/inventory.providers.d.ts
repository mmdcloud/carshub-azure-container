import { InventoryImage } from './entities/inventory-image.entity';
import { Inventory } from './entities/inventory.entity';
export declare const inventoryProviders: ({
    provide: string;
    useValue: typeof Inventory;
} | {
    provide: string;
    useValue: typeof InventoryImage;
})[];
