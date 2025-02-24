"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryProviders = void 0;
const inventory_image_entity_1 = require("./entities/inventory-image.entity");
const inventory_entity_1 = require("./entities/inventory.entity");
exports.inventoryProviders = [
    {
        provide: 'INVENTORY_REPOSITORY',
        useValue: inventory_entity_1.Inventory,
    },
    {
        provide: 'INVENTORY_IMAGES_REPOSITORY',
        useValue: inventory_image_entity_1.InventoryImage,
    },
];
//# sourceMappingURL=inventory.providers.js.map