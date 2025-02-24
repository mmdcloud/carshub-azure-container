"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleOwnersModule = void 0;
const common_1 = require("@nestjs/common");
const vehicle_owners_service_1 = require("./vehicle-owners.service");
const vehicle_owners_controller_1 = require("./vehicle-owners.controller");
const vehicle_owners_providers_1 = require("./vehicle-owners.providers");
let VehicleOwnersModule = class VehicleOwnersModule {
};
exports.VehicleOwnersModule = VehicleOwnersModule;
exports.VehicleOwnersModule = VehicleOwnersModule = __decorate([
    (0, common_1.Module)({
        controllers: [vehicle_owners_controller_1.VehicleOwnersController],
        providers: [vehicle_owners_service_1.VehicleOwnersService, ...vehicle_owners_providers_1.vehicleOwnersProviders],
    })
], VehicleOwnersModule);
//# sourceMappingURL=vehicle-owners.module.js.map