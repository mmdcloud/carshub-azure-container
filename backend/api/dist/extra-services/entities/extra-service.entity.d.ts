import { Model } from 'sequelize-typescript';
import { Order } from 'src/orders/entities/order.entity';
export declare class ExtraService extends Model {
    title: string;
    discount: string;
    price: string;
    orderId: number;
    order: Order;
}
