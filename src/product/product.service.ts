import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(createProductDto);
  }

  async likedProducts(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['likedProducts'],
    });
    return user.likedProducts;
  }

  async likeProduct(productId: number, userId: number) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
      relations: ['usersWhoLiked'],
    });
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (product.usersWhoLiked.find((user) => user.id === userId)) {
      product.usersWhoLiked = product.usersWhoLiked.filter(
        (user) => user.id !== userId,
      );
      await this.productsRepository.save(product);
      return { id: product.id, message: 'unliked' };
    } else {
      product.usersWhoLiked.push(user);
      await this.productsRepository.save(product);
      return { id: product.id, message: 'liked' };
    }
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log(
      '🚀 ~ file: product.service.ts:62 ~ ProductService ~ update ~ updateProductDto',
      updateProductDto,
    );
    return this.productsRepository.update({ id }, updateProductDto);
  }

  remove(id: number) {
    return this.productsRepository.delete({ id });
  }

  getLatest() {
    return this.productsRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 3,
    });
  }
}
