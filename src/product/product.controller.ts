import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import AbstractController from 'src/abstract.controller';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController extends AbstractController {
  constructor(private readonly productService: ProductService) {
    super();
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.successResponse(
      this.productService.create({
        ...createProductDto,
        images: createProductDto.images || [
          'http://localhost:3000/uploads/products/default.jpg',
        ],
      }),
    );
  }

  @Get()
  findAll() {
    return this.successResponse(this.productService.findAll());
  }

  @Get('latest')
  async getLatest() {
    return this.successResponse(this.productService.getLatest());
  }

  @UseGuards(JwtAuthGuard)
  @Get('liked')
  likedProduct(@Req() req: RequestWithUser) {
    return this.successResponse(
      this.productService.likedProducts(+req.user.userId),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productId = parseInt(id);

    if (!productId) return this.internalErrorResponse();

    const product = await this.productService.findOne(productId);

    if (product) return this.successResponse(product);

    return this.notFoundResponse();
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  likeProduct(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.successResponse(
      this.productService.likeProduct(+id, +req.user.userId),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.successResponse(this.productService.remove(+id));
  }
}
