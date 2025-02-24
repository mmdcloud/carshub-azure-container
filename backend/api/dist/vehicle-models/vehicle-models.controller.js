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
exports.VehicleModelsController = void 0;
const common_1 = require("@nestjs/common");
const vehicle_models_service_1 = require("./vehicle-models.service");
const create_vehicle_model_dto_1 = require("./dto/create-vehicle-model.dto");
const update_vehicle_model_dto_1 = require("./dto/update-vehicle-model.dto");
const auth_guard_1 = require("../auth.guard");
let VehicleModelsController = class VehicleModelsController {
    constructor(vehicleModelsService) {
        this.vehicleModelsService = vehicleModelsService;
    }
    create(createVehicleModelDto) {
        return this.vehicleModelsService.create(createVehicleModelDto);
    }
    findAll() {
        return this.vehicleModelsService.findAll();
    }
    findOne(id) {
        return this.vehicleModelsService.findOne(+id);
    }
    update(id, updateVehicleModelDto) {
        return this.vehicleModelsService.update(+id, updateVehicleModelDto);
    }
    remove(id) {
        return this.vehicleModelsService.remove(+id);
    }
};
exports.VehicleModelsController = VehicleModelsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vehicle_model_dto_1.CreateVehicleModelDto]),
    __metadata("design:returntype", void 0)
], VehicleModelsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VehicleModelsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehicleModelsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vehicle_model_dto_1.UpdateVehicleModelDto]),
    __metadata("design:returntype", void 0)
], VehicleModelsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehicleModelsController.prototype, "remove", null);
exports.VehicleModelsController = VehicleModelsController = __decorate([
    (0, common_1.Controller)('vehicle-models'),
    __metadata("design:paramtypes", [vehicle_models_service_1.VehicleModelsService])
], VehicleModelsController);
//# sourceMappingURL=vehicle-models.controller.js.map