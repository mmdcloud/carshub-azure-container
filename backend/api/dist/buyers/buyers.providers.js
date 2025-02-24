"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyersProviders = void 0;
const buyer_entity_1 = require("./entities/buyer.entity");
exports.buyersProviders = [
    {
        provide: 'BUYERS_REPOSITORY',
        useValue: buyer_entity_1.Buyer,
    },
];
//# sourceMappingURL=buyers.providers.js.map