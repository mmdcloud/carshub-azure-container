import { UpdateVehicleOwnerDto } from './dto/update-vehicle-owner.dto';
import { VehicleOwner } from './entities/vehicle-owner.entity';
export declare class VehicleOwnersService {
    private vehicleOwnersRepository;
    constructor(vehicleOwnersRepository: typeof VehicleOwner);
    create(createVehicleOwnerDto: any): Promise<VehicleOwner>;
    findAll(): Promise<VehicleOwner[]>;
    findOne(id: number): Promise<VehicleOwner>;
    update(id: number, updateVehicleOwnerDto: UpdateVehicleOwnerDto): Promise<[number, VehicleOwner[]]>;
    remove(id: number): Promise<number>;
}
