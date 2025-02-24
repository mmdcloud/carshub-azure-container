"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVehicleModelDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_vehicle_model_dto_1 = require("./create-vehicle-model.dto");
class UpdateVehicleModelDto extends (0, mapped_types_1.PartialType)(create_vehicle_model_dto_1.CreateVehicleModelDto) {
}
exports.UpdateVehicleModelDto = UpdateVehicleModelDto;
//# sourceMappingURL=update-vehicle-model.dto.js.map