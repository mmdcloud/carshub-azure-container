import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { ChangePasswordReqeust } from './dto/change-password-request.dto';
export declare class UsersService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: typeof User, jwtService: JwtService);
    create(createUserDto: any): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: number): Promise<number>;
    changePassword(request: ChangePasswordReqeust): Promise<any>;
    login(loginRequest: LoginRequestDto): Promise<LoginResponse>;
}
