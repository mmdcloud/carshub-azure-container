import { CreateBuyerDto } from './create-buyer.dto';
declare const UpdateBuyerDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBuyerDto>>;
export declare class UpdateBuyerDto extends UpdateBuyerDto_base {
    id: number;
    fullname: string;
    dob: string;
    email: string;
    contact: string;
    gender: string;
    city: string;
}
export {};
