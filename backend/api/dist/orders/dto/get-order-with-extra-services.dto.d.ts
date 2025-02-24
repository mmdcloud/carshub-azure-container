import { ExtraService } from "src/extra-services/entities/extra-service.entity";
import { Order } from "../entities/order.entity";
export declare class GetOrderWithExtraServicesDto {
    orderData: Order;
    extraServices: ExtraService[];
}
