import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>
  ) { }

  create(createItemDto: CreateItemDto) {
    return this.itemsRepository.save(createItemDto);
  }

  findAll(skip: number, take: number) {
    return this.itemsRepository.findAndCount({skip, take});
  }

  findOne(id: number) {
    return this.itemsRepository.findOneBy({ id });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return this.itemsRepository.delete(id);
  }
}
