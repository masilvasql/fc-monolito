import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    const productProps = product.get();

    return new Product({
      id: new Id(productProps.id),
      name: productProps.name,
      description: productProps.description,
      purchasePrice: productProps.purchasePrice,
      stock: productProps.stock,
      createdAt: productProps.createdAt,
      updatedAt: productProps.updatedAt,
    });
  }
}