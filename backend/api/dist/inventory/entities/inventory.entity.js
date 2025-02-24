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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const vehicle_model_entity_1 = require("../../vehicle-models/entities/vehicle-model.entity");
const vehicle_owner_entity_1 = require("../../vehicle-owners/entities/vehicle-owner.entity");
let Inventory = class Inventory extends sequelize_typescript_1.Model {
};
exports.Inventory = Inventory;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "color", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => vehicle_model_entity_1.VehicleModel),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Inventory.prototype, "modelId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => vehicle_model_entity_1.VehicleModel),
    __metadata("design:type", vehicle_model_entity_1.VehicleModel)
], Inventory.prototype, "model", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => vehicle_owner_entity_1.VehicleOwner),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Inventory.prototype, "ownerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => vehicle_owner_entity_1.VehicleOwner),
    __metadata("design:type", vehicle_owner_entity_1.VehicleOwner)
], Inventory.prototype, "owner", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Inventory.prototype, "day", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Inventory.prototype, "month", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Inventory.prototype, "year", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "registrationYear", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "passingCode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "kmsDriven", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "engineCapacity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "variant", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "fuelType", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "transmission", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "insurance", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "ownership", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "airbags", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "isofix", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "abs", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "centralLocking", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "ebd", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "tpms", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "hillHoldControl", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "hillDecentControl", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "tractionControl", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "rearDefogger", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "frontFogLights", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "instrumentPanelType", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "bluetoothCompatibility", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "steeringMountedControls", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "audioSystem", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "airConditioner", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "powerWindowsFront", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "steeringWheelMaterial", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "parkingAssistRear", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "powerOutlet12V", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "steeringAdjustment", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "seatUpholstery", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "pushButtonStart", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "cruiseControl", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "ventilatedSeatsFront", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "rearAC", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "displacement", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "cylinders", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "gearBoxNumberOfGears", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "noOfDiscBrakes", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "groundClearance", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "seatingCapacity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "bootspace", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "widthInMM", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "lengthInMM", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "wheelBaseInMM", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "fuelTankCapacity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "maxPowerInBHP", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "maxPowerInRPM", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "emissionStandard", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "maxTorqueInNM", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "headlampLensType", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "headlampBulbTypeHighBeam", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "headlampBulbTypeLowBeam", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "rimTypeFront", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Inventory.prototype, "rimTypeRear", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "daytimeRunningLights", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Inventory.prototype, "electricallyFoldableMirrors", void 0);
exports.Inventory = Inventory = __decorate([
    sequelize_typescript_1.Table
], Inventory);
//# sourceMappingURL=inventory.entity.js.map