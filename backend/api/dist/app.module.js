"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const vehicle_models_module_1 = require("./vehicle-models/vehicle-models.module");
const brands_module_1 = require("./brands/brands.module");
const inventory_module_1 = require("./inventory/inventory.module");
const orders_module_1 = require("./orders/orders.module");
const users_module_1 = require("./users/users.module");
const vehicle_owners_module_1 = require("./vehicle-owners/vehicle-owners.module");
const extra_services_module_1 = require("./extra-services/extra-services.module");
const buyers_module_1 = require("./buyers/buyers.module");
const database_providers_1 = require("./database.providers");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'static'),
            }), vehicle_models_module_1.VehicleModelsModule, brands_module_1.BrandsModule, inventory_module_1.InventoryModule, orders_module_1.OrdersModule, users_module_1.UsersModule, vehicle_owners_module_1.VehicleOwnersModule, extra_services_module_1.ExtraServicesModule, buyers_module_1.BuyersModule, dashboard_module_1.DashboardModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, ...database_providers_1.databaseProviders],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map