"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleOwnersProviders = void 0;
const vehicle_owner_entity_1 = require("./entities/vehicle-owner.entity");
exports.vehicleOwnersProviders = [
    {
        provide: 'VEHICLE_OWNERS_REPOSITORY',
        useValue: vehicle_owner_entity_1.VehicleOwner,
    },
];
//# sourceMappingURL=vehicle-owners.providers.js.map