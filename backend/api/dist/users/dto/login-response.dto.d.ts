import { User } from "../entities/user.entity";
export declare class LoginResponse {
    state: string;
    msg: string;
    access_token: string;
    user_data: User;
}
