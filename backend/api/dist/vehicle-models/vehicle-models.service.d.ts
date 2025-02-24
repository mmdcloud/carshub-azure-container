import { UpdateVehicleModelDto } from './dto/update-vehicle-model.dto';
import { VehicleModel } from './entities/vehicle-model.entity';
export declare class VehicleModelsService {
    private vehicleModelsRepository;
    constructor(vehicleModelsRepository: typeof VehicleModel);
    create(createVehicleModelDto: any): Promise<VehicleModel>;
    findAll(): Promise<VehicleModel[]>;
    findOne(id: number): Promise<VehicleModel>;
    update(id: number, updateVehicleModelDto: UpdateVehicleModelDto): Promise<[number, VehicleModel[]]>;
    remove(id: number): Promise<number>;
}
