"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVehicleOwnerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_vehicle_owner_dto_1 = require("./create-vehicle-owner.dto");
class UpdateVehicleOwnerDto extends (0, mapped_types_1.PartialType)(create_vehicle_owner_dto_1.CreateVehicleOwnerDto) {
}
exports.UpdateVehicleOwnerDto = UpdateVehicleOwnerDto;
//# sourceMappingURL=update-vehicle-owner.dto.js.map