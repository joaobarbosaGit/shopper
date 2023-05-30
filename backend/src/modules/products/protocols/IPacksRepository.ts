import { Packs } from "../infra/entities/packs.entity";

export interface IPacksRepository {
    findPacksByPackId(pack_id: number): Promise<Packs[] | []>;
    findPacksByProductId(product_id: number): Promise<Packs[] | []>;
    findAll(): Promise<Packs[]>;
    
}