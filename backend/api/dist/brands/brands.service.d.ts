import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
export declare class BrandsService {
    private brandsRepository;
    constructor(brandsRepository: typeof Brand);
    create(createBrandDto: any): Promise<Brand>;
    findAll(): Promise<Brand[]>;
    findOne(id: number): Promise<Brand>;
    update(id: number, updateBrandDto: UpdateBrandDto): Promise<[number, Brand[]]>;
    remove(id: number): Promise<number>;
}
