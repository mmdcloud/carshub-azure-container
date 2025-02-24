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
exports.Order = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const buyer_entity_1 = require("../../buyers/entities/buyer.entity");
const inventory_entity_1 = require("../../inventory/entities/inventory.entity");
let Order = class Order extends sequelize_typescript_1.Model {
};
exports.Order = Order;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => buyer_entity_1.Buyer),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Order.prototype, "buyerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => buyer_entity_1.Buyer),
    __metadata("design:type", buyer_entity_1.Buyer)
], Order.prototype, "buyer", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "discount", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "totalAmount", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Order.prototype, "day", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Order.prototype, "month", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Order.prototype, "year", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => inventory_entity_1.Inventory),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Order.prototype, "inventoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => inventory_entity_1.Inventory),
    __metadata("design:type", inventory_entity_1.Inventory)
], Order.prototype, "inventory", void 0);
exports.Order = Order = __decorate([
    sequelize_typescript_1.Table
], Order);
//# sourceMappingURL=order.entity.js.map