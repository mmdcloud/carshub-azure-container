"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleModelsProviders = void 0;
const vehicle_model_entity_1 = require("./entities/vehicle-model.entity");
exports.vehicleModelsProviders = [
    {
        provide: 'VEHICLE_MODELS_REPOSITORY',
        useValue: vehicle_model_entity_1.VehicleModel,
    },
];
//# sourceMappingURL=vehicle-model.providers.js.map