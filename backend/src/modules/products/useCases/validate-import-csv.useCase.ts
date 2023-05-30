import { container, inject, injectable } from "tsyringe";

import { IProductsRepository } from "../protocols/IProductsRepository";
import { IValidateImportCSVProductsDTO } from "../dtos/IValidateImportCSVProductsDTO";
import { IPacksRepository } from "../protocols/IPacksRepository";

import { ValidadePriceLessCostValueService } from "../services/validate-price-less-cost-value.service";
import { ValidadeReadJustmenntPercetualService } from "../services/validate-readjustment-percetual.service";

@injectable()
class ValidateImportCSVUseCase {

    constructor(
        //@ts-ignore
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        //@ts-ignore
        @inject("PacksRepository")
        private packsRepository: IPacksRepository,
    ) { };

    async execute({
        code,
        newPrice
    }: IValidateImportCSVProductsDTO): Promise<IValidateImportCSVProductsDTO> {

        const validadePriceLessCostValueService = container.resolve(ValidadePriceLessCostValueService);
        const validadeReadJustmenntPercetualService = container.resolve(ValidadeReadJustmenntPercetualService);
        const product = await this.productsRepository.findById(code);
        const validateImportCSVProducts: IValidateImportCSVProductsDTO = {
            code:0,
            newPrice:0,
            errorMensagem:"",
            status:""
        };

        const packsAssocieted = await this.packsRepository.findPacksByPackId(product.code);
        const productsAssocieted = await this.packsRepository.findPacksByProductId(product.code);

        // verificando se é um pack

        if (packsAssocieted.length) {

            // validando pack
            
            let qtyPack = 0;
            packsAssocieted.map( async (pack) => {
                qtyPack += Number(pack.qty);
            })
  
            const newPriceUnit = newPrice / qtyPack;
            
            const promise = packsAssocieted.map( async (pack) => {
                
                const productAssociate = await this.productsRepository.findById(pack.productId);
                
                validateImportCSVProducts.errorMensagem = validadePriceLessCostValueService.execute(newPriceUnit, productAssociate.costPrice);
                if(!validateImportCSVProducts.errorMensagem)
                validateImportCSVProducts.errorMensagem = validadeReadJustmenntPercetualService.execute(newPriceUnit, productAssociate.salesPrice);

                await this.productsRepository.update({
                    code: pack.productId,
                    name: productAssociate.name,
                    costPrice: productAssociate.costPrice,
                    salesPrice: newPriceUnit
                });
            })

            await Promise.all(promise);

            // validando produto

            const productPackAssociate = await this.productsRepository.findById(packsAssocieted[0].packId);

            validateImportCSVProducts.errorMensagem = validadePriceLessCostValueService.execute(newPrice, productPackAssociate.costPrice);
            if(!validateImportCSVProducts.errorMensagem)
            validateImportCSVProducts.errorMensagem = validadeReadJustmenntPercetualService.execute(newPrice, productPackAssociate.salesPrice);

            // atualizando banco

            await this.productsRepository.update({
                code: product.code,
                name: product.name,
                costPrice: product.costPrice,
                salesPrice: newPrice
            });

            validateImportCSVProducts.code = product.code;
            validateImportCSVProducts.newPrice = newPrice;
            
            // verificando se é produto que pertence a um pack

        } else if (productsAssocieted.length) {
            
            // validando produto

            const productAssociate = await this.productsRepository.findById(productsAssocieted[0].productId);

            validateImportCSVProducts.errorMensagem = validadePriceLessCostValueService.execute(newPrice, productAssociate.costPrice);
            if(!validateImportCSVProducts.errorMensagem)
            validateImportCSVProducts.errorMensagem = validadeReadJustmenntPercetualService.execute(newPrice, productAssociate.salesPrice);

            // validando pack

            const productPackAssociate = await this.productsRepository.findById(productsAssocieted[0].packId);

            const diff = newPrice - productAssociate.salesPrice;
            const newPricePack = Number(productPackAssociate.salesPrice) + Number(diff);
            
            validateImportCSVProducts.errorMensagem = validadePriceLessCostValueService.execute(newPricePack, productPackAssociate.costPrice);
            if(!validateImportCSVProducts.errorMensagem)
            validateImportCSVProducts.errorMensagem = validadeReadJustmenntPercetualService.execute(newPricePack, productPackAssociate.salesPrice);

            // atualizando banco

            await this.productsRepository.update({
                code:productPackAssociate.code,
                name: product.name,
                costPrice: product.costPrice,
                salesPrice: Number(newPricePack.toFixed(2))
            });

            await this.productsRepository.update({
                code: product.code,
                name: product.name,
                costPrice: product.costPrice,
                salesPrice: newPrice
            });

        } else {

            validateImportCSVProducts.errorMensagem = validadePriceLessCostValueService.execute(newPrice, product.costPrice);
            if(!validateImportCSVProducts.errorMensagem)
            validateImportCSVProducts.errorMensagem = validadeReadJustmenntPercetualService.execute(newPrice, product.salesPrice);

            await this.productsRepository.update({
                code: product.code,
                name: product.name,
                costPrice: product.costPrice,
                salesPrice: newPrice
            });
        }

        validateImportCSVProducts.code = product.code;
        validateImportCSVProducts.newPrice = newPrice;
        validateImportCSVProducts.status = !validateImportCSVProducts.errorMensagem ? "Processado com Sucesso" : "Error";

        return validateImportCSVProducts;
    }
}

export { ValidateImportCSVUseCase };