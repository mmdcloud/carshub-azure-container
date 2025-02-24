import { CreateVehicleOwnerDto } from './create-vehicle-owner.dto';
declare const UpdateVehicleOwnerDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVehicleOwnerDto>>;
export declare class UpdateVehicleOwnerDto extends UpdateVehicleOwnerDto_base {
    id: number;
    fullname: string;
    dob: string;
    email: string;
    contact: string;
    gender: string;
    city: string;
}
export {};
