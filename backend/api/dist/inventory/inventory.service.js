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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const inventory_entity_1 = require("./entities/inventory.entity");
const inventory_details_dto_1 = require("./dto/inventory-details.dto");
const client_s3_1 = require("@aws-sdk/client-s3");
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4', });
const s3Client = new client_s3_1.S3Client({ region: 'us-east-1' });
let InventoryService = class InventoryService {
    constructor(inventoryRepository, inventoryImagesRepository) {
        this.inventoryRepository = inventoryRepository;
        this.inventoryImagesRepository = inventoryImagesRepository;
    }
    async getSignedUrl(payload) {
        const myBucket = 'theplayer007-vehicle-images';
        const signedUrlExpireSeconds = 60 * 50;
        const myKey = payload.file;
        var metadata = {
            "typeofdocument": payload.type,
            "descriptionofdocument": payload.description,
            "inventoryid": payload.inventoryId
        };
        var url = await s3.getSignedUrlPromise('putObject', {
            Bucket: myBucket,
            Key: myKey,
            Expires: 3000,
            Metadata: metadata
        });
        const response = {
            statusCode: 200,
            body: url,
        };
        return response;
    }
    async create(createInventoryDto) {
        const record = new inventory_entity_1.Inventory(createInventoryDto);
        let indianDate = new Date().toLocaleString("en-Us", { timeZone: 'Asia/Kolkata' });
        record.day = new Date(indianDate).getDay();
        record.month = (new Date(indianDate).getMonth() + 1);
        record.year = new Date(indianDate).getFullYear();
        record.status = "Pending";
        return await record.save();
    }
    async findAll() {
        return this.inventoryRepository.findAll({
            include: ["model", "owner"]
        });
    }
    async findOne(id) {
        var response = new inventory_details_dto_1.InventoryDetailsDto();
        var imageData = await this.inventoryImagesRepository.findAll({
            attributes: ['type', 'path', 'inventoryId'],
            where: {
                inventoryId: id,
                type: "image"
            }
        });
        var documentData = await this.inventoryImagesRepository.findAll({
            attributes: ['type', 'path', 'inventoryId'],
            where: {
                inventoryId: id,
                type: "document"
            }
        });
        var inventoryData = await this.inventoryRepository.findByPk(id, {
            include: ["model", "owner"]
        });
        response.imageData = imageData;
        response.documentData = documentData;
        response.inventoryData = inventoryData;
        return response;
    }
    async update(id, updateInventoryDto) {
        const [affectedCount, affectedRows] = await this.inventoryRepository.update(updateInventoryDto, {
            where: { id },
            returning: true,
        });
        return [affectedCount, affectedRows];
    }
    async remove(id) {
        return this.inventoryRepository.destroy({ where: { id: id } });
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('INVENTORY_REPOSITORY')),
    __param(1, (0, common_1.Inject)('INVENTORY_IMAGES_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map