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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const order_entity_1 = require("./entities/order.entity");
const inventory_entity_1 = require("../inventory/entities/inventory.entity");
const get_order_with_extra_services_dto_1 = require("./dto/get-order-with-extra-services.dto");
const vehicle_model_entity_1 = require("../vehicle-models/entities/vehicle-model.entity");
const sequelize_1 = require("sequelize");
const vehicle_owner_entity_1 = require("../vehicle-owners/entities/vehicle-owner.entity");
const buyer_entity_1 = require("../buyers/entities/buyer.entity");
let OrdersService = class OrdersService {
    constructor(extraServicesRepository, ordersRepository, inventoryRepository) {
        this.extraServicesRepository = extraServicesRepository;
        this.ordersRepository = ordersRepository;
        this.inventoryRepository = inventoryRepository;
    }
    async create(createOrderDto) {
        var order = new order_entity_1.Order(createOrderDto);
        order.day = parseInt(createOrderDto.date.split("-")[2]);
        order.month = parseInt(createOrderDto.date.split("-")[1]);
        order.year = parseInt(createOrderDto.date.split("-")[0]);
        await this.inventoryRepository.update({
            status: "Completed"
        }, {
            where: {
                id: order.inventoryId
            }
        });
        return await order.save();
    }
    async findAll() {
        return this.ordersRepository.findAll({
            include: ["buyer", "inventory"]
        });
    }
    async findOne(id) {
        return this.ordersRepository.findByPk(id, {
            include: ["buyer", "inventory"]
        });
    }
    async generateReport(reportDto) {
        var fromDate = new Date(reportDto.fromDate);
        var toDate = new Date(reportDto.toDate);
        return this.ordersRepository.findAll({
            where: {
                [sequelize_1.Op.and]: [{ createdAt: { [sequelize_1.Op.gte]: fromDate } }, { createdAt: { [sequelize_1.Op.lte]: toDate } }],
            },
            include: [{
                    model: buyer_entity_1.Buyer, attributes: ["id", "fullname"]
                }, {
                    model: inventory_entity_1.Inventory, attributes: ["id", "modelId", "ownerId", "status", "price"], include: [{
                            model: vehicle_model_entity_1.VehicleModel, include: ["brand"]
                        }, {
                            model: vehicle_owner_entity_1.VehicleOwner, attributes: ["id", "fullname"]
                        }]
                }]
        });
    }
    async downloadInvoice(id) {
        return this.ordersRepository.findByPk(id, {
            include: ["buyer", "inventory"]
        });
    }
    async getOrderDetailsWithExtraServices(id) {
        var response = new get_order_with_extra_services_dto_1.GetOrderWithExtraServicesDto();
        var orderData = await this.ordersRepository.findByPk(id, {
            include: [{
                    model: buyer_entity_1.Buyer, attributes: ["id", "fullname", "email", "city", "contact"]
                }, {
                    model: inventory_entity_1.Inventory, attributes: ["id", "modelId", "ownerId", "status", "price"], include: [{
                            model: vehicle_model_entity_1.VehicleModel, include: ["brand"]
                        }, {
                            model: vehicle_owner_entity_1.VehicleOwner, attributes: ["id", "fullname"]
                        }]
                }]
        });
        var extraServicesData = await this.extraServicesRepository.findAll({
            where: {
                orderId: parseInt(id)
            }
        });
        response.orderData = orderData;
        response.extraServices = extraServicesData;
        return response;
    }
    async update(id, updateOrderDto) {
        const [affectedCount, affectedRows] = await this.ordersRepository.update(updateOrderDto, {
            where: { id },
            returning: true,
        });
        return [affectedCount, affectedRows];
    }
    async remove(id) {
        return this.ordersRepository.destroy({ where: { id: id } });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('EXTRA_SERVICES_REPOSITORY')),
    __param(1, (0, common_1.Inject)('ORDERS_REPOSITORY')),
    __param(2, (0, common_1.Inject)('INVENTORY_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object, Object])
], OrdersService);
//# sourceMappingURL=orders.service.js.map