
import { Repository } from "typeorm";

import { AppError } from "@shared/errors/AppError";
import { IProductsRepository } from "@modules/products/protocols/IProductsRepository";

import { appDataSource } from "database/datasource";
import { Products } from "../entities/products.entity";
import { ICreateAndUpdateProductsDTO } from "@modules/products/dtos/ICreateAndUpdateProductsDTO";

class ProductsRepository implements IProductsRepository {

    private repository: Repository<Products>;

    constructor() { 
        this.repository = appDataSource.getRepository("products");
    }

    async create(data: ICreateAndUpdateProductsDTO): Promise<Products> {
        await this.repository.create(data);

        return await this.repository.save(data);
    };

    async update(data: ICreateAndUpdateProductsDTO): Promise<Products> {
        const product = await this.repository.findOneBy({ code: data.code });

        if (!product) {
            throw new AppError("Produto com código: "+data.code+" não encontrado!", 404);
        }

        return await this.repository.save(data);
    };

    async findById(code: number): Promise<Products> {
        const team = await this.repository.findOneBy({ code });

        if (!team) {
            throw new AppError("Product not found", 400);
        }

        return team;
    };

    async findAll(): Promise<Products[]> {
        return await this.repository.find();
    };

    async delete(code: number): Promise<void> {
        const team = await this.repository.findOneBy({ code });

        if (!team) {
            throw new AppError("Product not found", 400);
        }

        await this.repository.delete({ code });
    };


}

export { ProductsRepository };