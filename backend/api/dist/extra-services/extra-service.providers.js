"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraServicesProviders = void 0;
const extra_service_entity_1 = require("./entities/extra-service.entity");
exports.extraServicesProviders = [
    {
        provide: 'EXTRA_SERVICES_REPOSITORY',
        useValue: extra_service_entity_1.ExtraService,
    },
];
//# sourceMappingURL=extra-service.providers.js.map