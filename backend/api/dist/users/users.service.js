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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const login_response_dto_1 = require("./dto/login-response.dto");
let UsersService = class UsersService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const user = new user_entity_1.User(createUserDto);
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        return await user.save();
    }
    async findAll() {
        return this.usersRepository.findAll();
    }
    async findOne(id) {
        return this.usersRepository.findByPk(id);
    }
    async update(id, updateUserDto) {
        const response = await this.usersRepository.update(updateUserDto, {
            where: { id: id },
        });
        if (response[0] > 0) {
            return this.usersRepository.findByPk(id);
        }
        return response;
    }
    async remove(id) {
        return this.usersRepository.destroy({ where: { id: id } });
    }
    async changePassword(request) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(request.password, salt);
        return this.usersRepository.update({ password: hash }, { where: { id: request.id } });
    }
    async login(loginRequest) {
        var response = new login_response_dto_1.LoginResponse();
        var record = await this.usersRepository.findAll({
            where: {
                contact: loginRequest.contact
            }
        });
        if (record.length == 0) {
            response.msg = "User not found !";
            response.state = "fail";
            return response;
        }
        const isMatch = await bcrypt.compare(loginRequest.password, record[0].password);
        if (!isMatch) {
            response.msg = "Invalid password !";
            response.state = "fail";
            return response;
        }
        response.msg = "Login successful !";
        response.state = "success";
        response.user_data = record[0];
        response.access_token = await this.jwtService.signAsync({
            sub: record[0].id, contact: record[0].contact, id: record[0].id
        });
        return response;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USERS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map