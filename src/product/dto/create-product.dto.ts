import Category from '../entities/category.enum';
import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  secondaryDescription1: string;
  @IsNumber()
  price: number;
  category: Category;
  images?: string[];
  @IsString()
  secondaryName: string;
}
