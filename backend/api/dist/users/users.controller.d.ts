import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { ChangePasswordReqeust } from './dto/change-password-request.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(request: LoginRequestDto): Promise<import("./dto/login-response.dto").LoginResponse>;
    changePassword(request: ChangePasswordReqeust): Promise<any>;
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: string): Promise<number>;
}
