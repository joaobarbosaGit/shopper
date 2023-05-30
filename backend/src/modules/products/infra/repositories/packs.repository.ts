import { Repository } from "typeorm";

import { appDataSource } from "database/datasource";

import { IPacksRepository } from "@modules/products/protocols/IPacksRepository";
import { Packs } from "../entities/packs.entity";

class PacksRepository implements IPacksRepository {

    private repository: Repository<Packs>;

    constructor() { 
        this.repository = appDataSource.getRepository("packs");
    }

    async findPacksByPackId(pack_id: number): Promise<Packs[] | []> {

            const packsByProduct_id = await this.repository.find({
                where: {
                    packId: pack_id
                }
            })
            return packsByProduct_id;

    };

    async findPacksByProductId(product_id: number): Promise<Packs[] | []> {

        const packsByProduct_id = await this.repository.find({
            where: {
                productId: product_id
            }
        })
        return packsByProduct_id;

};

    async findAll(): Promise<Packs[]> {
        return await this.repository.find();
    };



}

export { PacksRepository };