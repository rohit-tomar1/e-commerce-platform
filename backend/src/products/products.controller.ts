import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  Version,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from './dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  ApiFindAllProducts,
  ApiFindOneProduct,
  ApiCreateProduct,
  ApiUpdateProduct,
  ApiDeleteProduct,
} from './products.swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { BEARER_AUTH_NAME } from 'src/config/constans';

@ApiTags('Products')
@ApiBearerAuth(BEARER_AUTH_NAME)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
 
  @Public()
  @Get()
  @Version('1')
  @ApiFindAllProducts()
  findAll(@Query() filterDto?: FilterProductsDto) {
    return this.productsService.findAll(filterDto);
  }

  @Public()
  @Get(':id')
  @Version('1')
  @ApiFindOneProduct()
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Post()
  @Version('1')
  @ApiCreateProduct()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @Version('1')
  @ApiUpdateProduct()
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @Version('1')
  @ApiDeleteProduct()
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
