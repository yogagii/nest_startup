import {
  Controller,
  Get,
  Req,
  Post,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('cats')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Public()
  @Get()
  async findAll(@Req() request: Request): Promise<Cat[]> {
    console.log('This action returns all cats');
    return this.catsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id): string {
    // findOne(@Param() params): string {
    // console.log(params.id);
    console.log('id: ', id);
    return `This action returns a #${id} cat`;
  }

  @Post()
  @Roles('admin')
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return 'This action adds a new cat';
  }
}
