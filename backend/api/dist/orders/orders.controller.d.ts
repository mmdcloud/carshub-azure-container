import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ReportDto } from './dto/report.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    downloadInvoice(id: string): Promise<import("./entities/order.entity").Order>;
    generateReport(reportDto: ReportDto): Promise<any>;
    getOrderDetailsWithExtraServices(id: string): Promise<import("./dto/get-order-with-extra-services.dto").GetOrderWithExtraServicesDto>;
    create(createOrderDto: CreateOrderDto): Promise<import("./entities/order.entity").Order>;
    findAll(): Promise<import("./entities/order.entity").Order[]>;
    findOne(id: string): Promise<import("./entities/order.entity").Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<[number, import("./entities/order.entity").Order[]]>;
    remove(id: string): Promise<number>;
}
