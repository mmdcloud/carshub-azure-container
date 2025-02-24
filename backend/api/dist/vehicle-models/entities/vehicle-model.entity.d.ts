import { Model } from 'sequelize-typescript';
import { Brand } from 'src/brands/entities/brand.entity';
export declare class VehicleModel extends Model {
    name: string;
    brandId: number;
    brand: Brand;
}
