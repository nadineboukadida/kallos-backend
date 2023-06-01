import Category from '../entities/category.enum';

export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: Category;
  images?: string[];
}
