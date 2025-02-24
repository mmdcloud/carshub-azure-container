import { CreateVehicleModelDto } from './create-vehicle-model.dto';
declare const UpdateVehicleModelDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVehicleModelDto>>;
export declare class UpdateVehicleModelDto extends UpdateVehicleModelDto_base {
    id: number;
    name: string;
    brandId: number;
}
export {};
