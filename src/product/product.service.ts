import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProduct(productDto: ProductDto): Promise<Product> {
    const product = new this.productModel(productDto);
    return product.save();
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async gerProduct(id: string): Promise<Product> {
    const Product = await this.productModel.findById(id);
    return Product;
  }

  async deleteProduct(id: string): Promise<any> {
    const productDeleted = await this.productModel.findByIdAndDelete(id);
    return productDeleted;
  }

  async updateProduct(id: string, productDto: ProductDto): Promise<Product> {
    const productUpdate = await this.productModel.findByIdAndUpdate(
      id,
      productDto,
      { new: true },
    );
    productUpdate.save();
    return productUpdate;
  }
}
