import { UpdateExtraServiceDto } from './dto/update-extra-service.dto';
import { ExtraService } from './entities/extra-service.entity';
export declare class ExtraServicesService {
    private extraServicesRepository;
    constructor(extraServicesRepository: typeof ExtraService);
    create(createExtraServiceDto: any): Promise<ExtraService>;
    findAll(): Promise<ExtraService[]>;
    findOne(id: number): Promise<ExtraService>;
    update(id: number, updateExtraServiceDto: UpdateExtraServiceDto): Promise<string>;
    remove(id: number): Promise<number>;
}
