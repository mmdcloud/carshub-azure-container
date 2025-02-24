import { ExtraServicesService } from './extra-services.service';
import { CreateExtraServiceDto } from './dto/create-extra-service.dto';
import { UpdateExtraServiceDto } from './dto/update-extra-service.dto';
export declare class ExtraServicesController {
    private readonly extraServicesService;
    constructor(extraServicesService: ExtraServicesService);
    create(createExtraServiceDto: CreateExtraServiceDto): Promise<import("./entities/extra-service.entity").ExtraService>;
    findAll(): Promise<import("./entities/extra-service.entity").ExtraService[]>;
    findOne(id: string): Promise<import("./entities/extra-service.entity").ExtraService>;
    update(id: string, updateExtraServiceDto: UpdateExtraServiceDto): Promise<string>;
    remove(id: string): Promise<number>;
}
