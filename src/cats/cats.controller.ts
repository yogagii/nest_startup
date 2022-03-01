import { Controller, Get, Req, Post, Param, Body } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(@Req() request: Request): Promise<Cat[]> {
    console.log('This action returns all cats');
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): string {
    // findOne(@Param() params): string {
    // console.log(params.id);
    console.log('id: ', id);
    return `This action returns a #${id} cat`;
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    // return 'This action adds a new cat';
  }
}
