"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersProviders = void 0;
const order_entity_1 = require("./entities/order.entity");
exports.ordersProviders = [
    {
        provide: 'ORDERS_REPOSITORY',
        useValue: order_entity_1.Order,
    },
];
//# sourceMappingURL=orders.providers.js.map