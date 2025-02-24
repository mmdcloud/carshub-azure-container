import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { InventoryImage } from './entities/inventory-image.entity';
import { InventoryDetailsDto } from './dto/inventory-details.dto';
export declare class InventoryService {
    private inventoryRepository;
    private inventoryImagesRepository;
    constructor(inventoryRepository: typeof Inventory, inventoryImagesRepository: typeof InventoryImage);
    getSignedUrl(payload: any): Promise<object>;
    create(createInventoryDto: any): Promise<Inventory>;
    findAll(): Promise<Inventory[]>;
    findOne(id: number): Promise<InventoryDetailsDto>;
    update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<[number, Inventory[]]>;
    remove(id: number): Promise<number>;
}
