import { VehicleModelsService } from './vehicle-models.service';
import { CreateVehicleModelDto } from './dto/create-vehicle-model.dto';
import { UpdateVehicleModelDto } from './dto/update-vehicle-model.dto';
export declare class VehicleModelsController {
    private readonly vehicleModelsService;
    constructor(vehicleModelsService: VehicleModelsService);
    create(createVehicleModelDto: CreateVehicleModelDto): Promise<import("./entities/vehicle-model.entity").VehicleModel>;
    findAll(): Promise<import("./entities/vehicle-model.entity").VehicleModel[]>;
    findOne(id: string): Promise<import("./entities/vehicle-model.entity").VehicleModel>;
    update(id: string, updateVehicleModelDto: UpdateVehicleModelDto): Promise<[number, import("./entities/vehicle-model.entity").VehicleModel[]]>;
    remove(id: string): Promise<number>;
}
