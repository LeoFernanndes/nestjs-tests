import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemDto, ListItemDto } from './dto/item.dto';
import { LoggingInterceptor } from './logging.interceptor';


@UseInterceptors(LoggingInterceptor)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiCreatedResponse({type: ItemDto})
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @ApiOkResponse({type: ListItemDto})
  @Get()
  async findAll(
    @Query('page') page: number = 0,
    @Query('page_size') page_size: number = 100
  ) {
    const [items, quantity] = await this.itemsService.findAll(page * page_size, page_size);
    const pages = Math.ceil(quantity/page_size)
    return {items, pages}
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
