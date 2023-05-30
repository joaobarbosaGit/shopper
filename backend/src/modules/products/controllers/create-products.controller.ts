import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProductsUseCase } from "../useCases/create-products.useCase";


class CreateProductsController {

    async handle(request: Request, response: Response): Promise<Response>{
         
        const {  
            code,
            name, 
            costPrice,
            salesPrice
         } = request.body;

        const createProductsUseCase = container.resolve(CreateProductsUseCase);

        await createProductsUseCase.execute({ 
            code,
            name, 
            costPrice,
            salesPrice
        });

        return response.status(201).send();
    }

}

export { CreateProductsController };