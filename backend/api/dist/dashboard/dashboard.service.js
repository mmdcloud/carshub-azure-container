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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const get_dashboard_data_dto_1 = require("./dto/get-dashboard-data.dto");
let DashboardService = class DashboardService {
    constructor(buyersRepository, ordersRepository, inventoryRepository, brandsRepository, vehicleModelsRepository, vehicleOwnersRepository) {
        this.buyersRepository = buyersRepository;
        this.ordersRepository = ordersRepository;
        this.inventoryRepository = inventoryRepository;
        this.brandsRepository = brandsRepository;
        this.vehicleModelsRepository = vehicleModelsRepository;
        this.vehicleOwnersRepository = vehicleOwnersRepository;
    }
    create(createDashboardDto) {
        return 'This action adds a new dashboard';
    }
    async findAll() {
        var response = new get_dashboard_data_dto_1.GetDashboardData();
        let indianDate = new Date().toLocaleString("en-Us", { timeZone: 'Asia/Kolkata' });
        var totalBuyers = await this.buyersRepository.count();
        var totalOwners = await this.vehicleOwnersRepository.count();
        var totalOrders = await this.ordersRepository.count();
        var totalBrands = await this.brandsRepository.count();
        var totalModels = await this.vehicleModelsRepository.count();
        var totalInventory = await this.inventoryRepository.count();
        var totalOrdersThisMonth = await this.ordersRepository.count({
            where: {
                month: (new Date(indianDate).getMonth() + 1),
                year: new Date(indianDate).getFullYear()
            }
        });
        var totalInventoryThisMonth = await this.inventoryRepository.count({
            where: {
                month: (new Date(indianDate).getMonth() + 1),
                year: new Date(indianDate).getFullYear()
            }
        });
        response.totalBrands = totalBrands;
        response.totalOwners = totalOwners;
        response.totalBuyers = totalBuyers;
        response.totalModels = totalModels;
        response.totalOrders = totalOrders;
        response.totalInventory = totalInventory;
        response.totalOrdersThisMonth = totalOrdersThisMonth;
        response.totalInventoryThisMonth = totalInventoryThisMonth;
        return response;
    }
    findOne(id) {
        return `This action returns a #${id} dashboard`;
    }
    update(id, updateDashboardDto) {
        return `This action updates a #${id} dashboard`;
    }
    remove(id) {
        return `This action removes a #${id} dashboard`;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('BUYERS_REPOSITORY')),
    __param(1, (0, common_1.Inject)('ORDERS_REPOSITORY')),
    __param(2, (0, common_1.Inject)('INVENTORY_REPOSITORY')),
    __param(3, (0, common_1.Inject)('BRANDS_REPOSITORY')),
    __param(4, (0, common_1.Inject)('VEHICLE_MODELS_REPOSITORY')),
    __param(5, (0, common_1.Inject)('VEHICLE_OWNERS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map