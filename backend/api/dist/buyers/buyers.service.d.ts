import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { Buyer } from './entities/buyer.entity';
export declare class BuyersService {
    private buyersRepository;
    constructor(buyersRepository: typeof Buyer);
    create(createBuyerDto: any): Promise<Buyer>;
    findAll(): Promise<Buyer[]>;
    findOne(id: number): Promise<Buyer>;
    update(id: number, updateBuyerDto: UpdateBuyerDto): Promise<[number, Buyer[]]>;
    remove(id: number): Promise<number>;
}
