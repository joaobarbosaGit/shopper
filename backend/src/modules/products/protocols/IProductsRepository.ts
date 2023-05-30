import { ICreateAndUpdateProductsDTO } from "../dtos/ICreateAndUpdateProductsDTO";
import { Products } from "../infra/entities/products.entity";

export interface IProductsRepository {
    create(dados: ICreateAndUpdateProductsDTO): Promise<Products>;
    update(dados: ICreateAndUpdateProductsDTO): Promise<Products>;
    findById(code: number): Promise<Products>;
    findAll(): Promise<Products[]>;
    delete(code: number): Promise<void>;
}