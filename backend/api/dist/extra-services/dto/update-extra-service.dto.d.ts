import { CreateExtraServiceDto } from './create-extra-service.dto';
declare const UpdateExtraServiceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateExtraServiceDto>>;
export declare class UpdateExtraServiceDto extends UpdateExtraServiceDto_base {
    id: number;
    title: string;
    discount: string;
    price: string;
}
export {};
