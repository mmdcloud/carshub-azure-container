"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExtraServiceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_extra_service_dto_1 = require("./create-extra-service.dto");
class UpdateExtraServiceDto extends (0, mapped_types_1.PartialType)(create_extra_service_dto_1.CreateExtraServiceDto) {
}
exports.UpdateExtraServiceDto = UpdateExtraServiceDto;
//# sourceMappingURL=update-extra-service.dto.js.map