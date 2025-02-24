import { VehicleOwnersService } from './vehicle-owners.service';
import { CreateVehicleOwnerDto } from './dto/create-vehicle-owner.dto';
import { UpdateVehicleOwnerDto } from './dto/update-vehicle-owner.dto';
export declare class VehicleOwnersController {
    private readonly vehicleOwnersService;
    constructor(vehicleOwnersService: VehicleOwnersService);
    create(createVehicleOwnerDto: CreateVehicleOwnerDto): Promise<import("./entities/vehicle-owner.entity").VehicleOwner>;
    findAll(): Promise<import("./entities/vehicle-owner.entity").VehicleOwner[]>;
    findOne(id: string): Promise<import("./entities/vehicle-owner.entity").VehicleOwner>;
    update(id: string, updateVehicleOwnerDto: UpdateVehicleOwnerDto): Promise<[number, import("./entities/vehicle-owner.entity").VehicleOwner[]]>;
    remove(id: string): Promise<number>;
}
