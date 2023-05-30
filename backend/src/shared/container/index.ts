import { container } from "tsyringe";

import { IProductsRepository } from "@modules/products/protocols/IProductsRepository";
import { ProductsRepository } from "@modules/products/infra/repositories/products.repository";

import { IPacksRepository } from "@modules/products/protocols/IPacksRepository";
import { PacksRepository } from "@modules/products/infra/repositories/packs.repository";

container.registerSingleton<IProductsRepository>(
    "ProductsRepository",
    ProductsRepository
);

container.registerSingleton<IPacksRepository>(
    "PacksRepository",
    PacksRepository
);
