import { inject, injectable } from "tsyringe";

import { IProductsRepository } from "../protocols/IProductsRepository";
import { ICreateAndUpdateProductsDTO } from "../dtos/ICreateAndUpdateProductsDTO";

@injectable()
class CreateProductsUseCase {

    constructor(
        //@ts-ignore
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository) {};

    async execute({
        code,
        name,
        costPrice,
        salesPrice
    }: ICreateAndUpdateProductsDTO): Promise<void> {
        await this.productsRepository.create({
            code,
            name,
            costPrice,
            salesPrice
        });
    }
}

export { CreateProductsUseCase };