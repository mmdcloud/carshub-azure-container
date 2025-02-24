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
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const brand_entity_1 = require("./entities/brand.entity");
let BrandsService = class BrandsService {
    constructor(brandsRepository) {
        this.brandsRepository = brandsRepository;
    }
    async create(createBrandDto) {
        const brand = new brand_entity_1.Brand(createBrandDto);
        return await brand.save();
    }
    async findAll() {
        return this.brandsRepository.findAll();
    }
    async findOne(id) {
        return this.brandsRepository.findByPk(id);
    }
    async update(id, updateBrandDto) {
        const [affectedCount, affectedRows] = await this.brandsRepository.update(updateBrandDto, {
            where: { id },
            returning: true,
        });
        return [affectedCount, affectedRows];
    }
    async remove(id) {
        return this.brandsRepository.destroy({ where: { id: id } });
    }
};
exports.BrandsService = BrandsService;
exports.BrandsService = BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('BRANDS_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], BrandsService);
//# sourceMappingURL=brands.service.js.map