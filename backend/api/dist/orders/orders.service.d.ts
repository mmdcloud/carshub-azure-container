import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { ExtraService } from 'src/extra-services/entities/extra-service.entity';
import { GetOrderWithExtraServicesDto } from './dto/get-order-with-extra-services.dto';
import { ReportDto } from './dto/report.dto';
export declare class OrdersService {
    private extraServicesRepository;
    private ordersRepository;
    private inventoryRepository;
    constructor(extraServicesRepository: typeof ExtraService, ordersRepository: typeof Order, inventoryRepository: typeof Inventory);
    create(createOrderDto: any): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    generateReport(reportDto: ReportDto): Promise<any>;
    downloadInvoice(id: number): Promise<Order>;
    getOrderDetailsWithExtraServices(id: string): Promise<GetOrderWithExtraServicesDto>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<[number, Order[]]>;
    remove(id: number): Promise<number>;
}
