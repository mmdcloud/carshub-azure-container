import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { Buyer } from 'src/buyers/entities/buyer.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { VehicleModel } from 'src/vehicle-models/entities/vehicle-model.entity';
import { VehicleOwner } from 'src/vehicle-owners/entities/vehicle-owner.entity';
import { GetDashboardData } from './dto/get-dashboard-data.dto';
export declare class DashboardService {
    private buyersRepository;
    private ordersRepository;
    private inventoryRepository;
    private brandsRepository;
    private vehicleModelsRepository;
    private vehicleOwnersRepository;
    constructor(buyersRepository: typeof Buyer, ordersRepository: typeof Order, inventoryRepository: typeof Inventory, brandsRepository: typeof Brand, vehicleModelsRepository: typeof VehicleModel, vehicleOwnersRepository: typeof VehicleOwner);
    create(createDashboardDto: CreateDashboardDto): string;
    findAll(): Promise<GetDashboardData>;
    findOne(id: number): string;
    update(id: number, updateDashboardDto: UpdateDashboardDto): string;
    remove(id: number): string;
}
