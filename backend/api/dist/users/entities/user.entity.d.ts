import { Model } from 'sequelize-typescript';
export declare class User extends Model {
    fullname: string;
    city: string;
    dob: string;
    gender: string;
    contact: string;
    email: string;
    password: string;
}
