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
exports.ExtraServicesService = void 0;
const common_1 = require("@nestjs/common");
const extra_service_entity_1 = require("./entities/extra-service.entity");
let ExtraServicesService = class ExtraServicesService {
    constructor(extraServicesRepository) {
        this.extraServicesRepository = extraServicesRepository;
    }
    async create(createExtraServiceDto) {
        var service = new extra_service_entity_1.ExtraService(createExtraServiceDto);
        return await service.save();
    }
    async findAll() {
        return this.extraServicesRepository.findAll();
    }
    async findOne(id) {
        return this.extraServicesRepository.findByPk(id);
    }
    async update(id, updateExtraServiceDto) {
        return `This action updates a #${id} extraService`;
    }
    async remove(id) {
        return this.extraServicesRepository.destroy({ where: { id: id } });
    }
};
exports.ExtraServicesService = ExtraServicesService;
exports.ExtraServicesService = ExtraServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('EXTRA_SERVICES_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], ExtraServicesService);
//# sourceMappingURL=extra-services.service.js.map