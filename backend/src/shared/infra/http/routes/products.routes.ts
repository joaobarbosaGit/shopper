import { Router, Request, Response } from "express"; 
import multer from "multer";
import { Readable } from "stream";
import readline from "readline";

import { CreateProductsController } from "@modules/products/controllers/create-products.controller";
import { container } from "tsyringe";
import { ValidateImportCSVUseCase } from "@modules/products/useCases/validate-import-csv.useCase";


const multerConfig = multer();

const productsRoutes = Router();

interface Product {
    code: number;
    newPrice: number;
    status?: string;
    errorMensagem?: string;
}

const createProductsController = new CreateProductsController();
const validateImportCSVUseCase = container.resolve(ValidateImportCSVUseCase);

productsRoutes.post("", createProductsController.handle);

productsRoutes.post("/import", 
multerConfig.single('file'), 
async (request: Request, response: Response) =>{

    const { file } = request;
    
    if (file?.buffer){
        const { buffer } = file;
        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const productsLine = readline.createInterface({
            input: readableFile
        });

        const products: Product[] = [];
        const productsListReturn: Product[] = [];
        let counter = 1;

        for await (let line of productsLine){
            if(counter > 1){
            const productsLineSplit = line.split(",");
            products.push({
                code: Number(productsLineSplit[0]),
                newPrice: Number(productsLineSplit[1]),
                errorMensagem:"",
                status:""
             })
            }
        counter++;
        }

        for await (let product of products){
            if(product.code != null){
                productsListReturn.push(await validateImportCSVUseCase.execute(product));
            }
        }
        return response.json(productsListReturn);
    }

    return response.send();

});


export { productsRoutes };