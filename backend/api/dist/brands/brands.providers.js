"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandsProviders = void 0;
const brand_entity_1 = require("./entities/brand.entity");
exports.brandsProviders = [
    {
        provide: 'BRANDS_REPOSITORY',
        useValue: brand_entity_1.Brand,
    },
];
//# sourceMappingURL=brands.providers.js.map