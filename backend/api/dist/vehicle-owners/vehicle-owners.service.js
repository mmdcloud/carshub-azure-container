"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleOwnersService = void 0;
const common_1 = require("@nestjs/common");
const vehicle_owner_entity_1 = require("./entities/vehicle-owner.entity");
let VehicleOwnersService = class VehicleOwnersService {
    constructor(vehicleOwnersRepository) {
        this.vehicleOwnersRepository = vehicleOwnersRepository;
    }
    async create(createVehicleOwnerDto) {
        const owner = new vehicle_owner_entity_1.VehicleOwner(createVehicleOwnerDto);
        return await owner.save();
    }
    async findAll() {
        return this.vehicleOwnersRepository.findAll();
    }
    async findOne(id) {
        return this.vehicleOwnersRepository.findByPk(id);
    }
    async update(id, updateVehicleOwnerDto) {
        const [affectedCount, affectedRows] = await this.vehicleOwnersRepository.update(updateVehicleOwnerDto, {
            where: { id },
            returning: true,
        });
        return [affectedCount, affectedRows];
    }
    async remove(id) {
        return this.vehicleOwnersRepository.destroy({ where: { id: id } });
    }
};
exports.VehicleOwnersService = VehicleOwnersService;
exports.VehicleOwnersService = VehicleOwnersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('VEHICLE_OWNERS_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], VehicleOwnersService);
//# sourceMappingURL=vehicle-owners.service.js.map