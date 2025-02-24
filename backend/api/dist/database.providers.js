"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("./users/entities/user.entity");
const brand_entity_1 = require("./brands/entities/brand.entity");
const buyer_entity_1 = require("./buyers/entities/buyer.entity");
const vehicle_model_entity_1 = require("./vehicle-models/entities/vehicle-model.entity");
const vehicle_owner_entity_1 = require("./vehicle-owners/entities/vehicle-owner.entity");
const extra_service_entity_1 = require("./extra-services/entities/extra-service.entity");
const order_entity_1 = require("./orders/entities/order.entity");
const inventory_entity_1 = require("./inventory/entities/inventory.entity");
const inventory_image_entity_1 = require("./inventory/entities/inventory-image.entity");
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: 'mysql',
                host: process.env.DB_PATH,
                port: 3306,
                username: process.env.USERNAME,
                password: process.env.PASSWORD,
                database: 'carshub',
            });
            sequelize.addModels([
                user_entity_1.User, brand_entity_1.Brand, buyer_entity_1.Buyer, vehicle_model_entity_1.VehicleModel, vehicle_owner_entity_1.VehicleOwner, extra_service_entity_1.ExtraService,
                order_entity_1.Order, inventory_entity_1.Inventory, inventory_image_entity_1.InventoryImage
            ]);
            await sequelize.sync({
                force: false,
            });
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.providers.js.map