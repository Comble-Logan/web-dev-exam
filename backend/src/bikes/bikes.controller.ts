import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { BikesService } from "./bikes.service";
import {GetBikeDto} from "./dto/get-bike.dto";
import {CreateBikeDto} from "./dto/create-bike.dto";
import {BikeResponseDto} from "./dto/bikes-response.dto";
import {UpdateBikeDto} from "./dto/update-bike.dto";


@Controller("bikes")
export class BikesController {
  constructor(
    @Inject(BikesService) private readonly service: BikesService,
  ) {}

  @Get()
  async findAll(
    @Query() query: GetBikeDto): Promise<{totalCount: number; customers: BikeResponseDto[]}> {
    const result = await this.service.findAll(query.page, query.limit);
    return {
      totalCount: result.totalCount,
      customers: result.bikes.map((model) => BikeResponseDto.fromModel(model),
      )};
  }

  @Post()
  async create(@Body() dto: CreateBikeDto): Promise<BikeResponseDto> {
    return BikeResponseDto.fromModel(await this.service.create(dto));
  }

  @Get(":id")
  async findById(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<BikeResponseDto> {
    return BikeResponseDto.fromModel(await this.service.findById(id));
  }

  @Patch(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateBikeDto
  ): Promise<BikeResponseDto> {
    return BikeResponseDto.fromModel(await this.service.update(id, dto));
  }

  @Delete(":id")
  @HttpCode(204)
  async delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    await this.service.delete(id);
  }
}
