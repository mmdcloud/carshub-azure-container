import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { GetSignedUrlDto } from './dto/get-signed-url.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getSignedUrl(getSignedUrlDto: GetSignedUrlDto): Promise<object>;
    create(createInventoryDto: CreateInventoryDto): Promise<import("./entities/inventory.entity").Inventory>;
    findAll(): Promise<import("./entities/inventory.entity").Inventory[]>;
    findOne(id: string): Promise<import("./dto/inventory-details.dto").InventoryDetailsDto>;
    update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<[number, import("./entities/inventory.entity").Inventory[]]>;
    remove(id: string): Promise<number>;
}
