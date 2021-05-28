import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(@Res() res, @Body() productDto: ProductDto) {
    const product = await this.productService.createProduct(productDto);
    return res.status(HttpStatus.ACCEPTED).json({
      message: 'El producto fue creado',
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('/:productId')
  async getProduct(@Res() res, @Param('productId') productId: string) {
    if (productId.length == 24) {
      const product = await this.productService.gerProduct(productId);
      if (product) return res.status(HttpStatus.OK).json(product);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'El producto no existe',
      });
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'El producto no existe',
      });
    }
  }

  @Delete('/:productId')
  async deleteProduct(@Res() res, @Param('productId') productId: string) {
    if (productId.length == 24) {
      const product = await this.productService.deleteProduct(productId);
      if (product)
        return res.status(HttpStatus.ACCEPTED).json({
          message: 'El producto fue eliminado',
        });
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'El producto no existe',
      });
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'El producto no existe',
      });
    }
  }

  @Put('/:productId')
  async updateProduct(
    @Res() res,
    @Body() productDto: ProductDto,
    @Param('productId') productId: string,
  ) {
    if (productId.length == 24) {
      const product = await this.productService.updateProduct(
        productId,
        productDto,
      );
      if (product)
        return res.status(HttpStatus.ACCEPTED).json({
          message: 'El producto fue editado',
        });
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'El producto no existe',
      });
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'El producto no existe',
      });
    }
  }
}
