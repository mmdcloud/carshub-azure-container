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
exports.VehicleOwnersController = void 0;
const common_1 = require("@nestjs/common");
const vehicle_owners_service_1 = require("./vehicle-owners.service");
const create_vehicle_owner_dto_1 = require("./dto/create-vehicle-owner.dto");
const update_vehicle_owner_dto_1 = require("./dto/update-vehicle-owner.dto");
const auth_guard_1 = require("../auth.guard");
let VehicleOwnersController = class VehicleOwnersController {
    constructor(vehicleOwnersService) {
        this.vehicleOwnersService = vehicleOwnersService;
    }
    create(createVehicleOwnerDto) {
        return this.vehicleOwnersService.create(createVehicleOwnerDto);
    }
    findAll() {
        return this.vehicleOwnersService.findAll();
    }
    findOne(id) {
        return this.vehicleOwnersService.findOne(+id);
    }
    update(id, updateVehicleOwnerDto) {
        return this.vehicleOwnersService.update(+id, updateVehicleOwnerDto);
    }
    remove(id) {
        return this.vehicleOwnersService.remove(+id);
    }
};
exports.VehicleOwnersController = VehicleOwnersController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vehicle_owner_dto_1.CreateVehicleOwnerDto]),
    __metadata("design:returntype", void 0)
], VehicleOwnersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VehicleOwnersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehicleOwnersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vehicle_owner_dto_1.UpdateVehicleOwnerDto]),
    __metadata("design:returntype", void 0)
], VehicleOwnersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehicleOwnersController.prototype, "remove", null);
exports.VehicleOwnersController = VehicleOwnersController = __decorate([
    (0, common_1.Controller)('vehicle-owners'),
    __metadata("design:paramtypes", [vehicle_owners_service_1.VehicleOwnersService])
], VehicleOwnersController);
//# sourceMappingURL=vehicle-owners.controller.js.map