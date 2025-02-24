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
exports.BuyersService = void 0;
const common_1 = require("@nestjs/common");
const buyer_entity_1 = require("./entities/buyer.entity");
let BuyersService = class BuyersService {
    constructor(buyersRepository) {
        this.buyersRepository = buyersRepository;
    }
    async create(createBuyerDto) {
        const buyer = new buyer_entity_1.Buyer(createBuyerDto);
        return await buyer.save();
    }
    async findAll() {
        return this.buyersRepository.findAll();
    }
    async findOne(id) {
        return this.buyersRepository.findByPk(id);
    }
    async update(id, updateBuyerDto) {
        const [affectedCount, affectedRows] = await this.buyersRepository.update(updateBuyerDto, {
            where: { id },
            returning: true,
        });
        return [affectedCount, affectedRows];
    }
    async remove(id) {
        return this.buyersRepository.destroy({ where: { id: id } });
    }
};
exports.BuyersService = BuyersService;
exports.BuyersService = BuyersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('BUYERS_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], BuyersService);
//# sourceMappingURL=buyers.service.js.map