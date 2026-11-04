import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { BikeEntity} from "./entities/bike.entity";
import {BikeSellEntity} from "../customers/entities/bike-sell.entity";
import type { BikeModel} from "./models/bike.model";
import type { CreateBikeDto } from "./dto/create-bike.dto";
import type {UpdateBikeDto} from "./dto/update-bike.dto";
import {CustomerEntity} from "../customers/entities/customer.entity";


@Injectable()
export class BikesRepository {
  constructor(@InjectDataSource() private readonly dateSource: DataSource) {}

  async findAll(page: number, limit: number): Promise<{totalCount: number, bikes: BikeModel[]}> {
    const [entities, totalCount] = await this.dateSource
      .getRepository(BikeEntity)
      .findAndCount({order: {brand: "ASC", model: "ASC", id: "ASC"}, skip: (page-1)*limit, take: limit});
    return {totalCount, bikes: entities.map((entity) => this.toBikeModel(entity))};
  }

  async findById(id: string): Promise<BikeModel | null> {
    const entity = await this.dateSource
      .getRepository(BikeEntity)
      .findOneBy({ id });
    return entity ? this.toBikeModel(entity) : null;
  }

  async create(input: CreateBikeDto): Promise<BikeModel> {
    const repository = this.dateSource.getRepository(BikeEntity);
    const entity = await repository.save(repository.create(input));
    return this.toBikeModel(entity);
  }

  async update(id: string, input: UpdateBikeDto): Promise<BikeModel> {
    return await this.dateSource.transaction(async (manager) => {
      const repository = manager.getRepository(BikeEntity);
      const entity = await repository.findOneBy({ id });
      if (!entity) {throw new Error("Bike not found");}
      repository.merge(entity, input);
      return this.toBikeModel(await repository.save(entity));
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.dateSource
      .getRepository(BikeEntity)
      .delete(id);
    return (result.affected ?? 0) > 0;
  }

  private toBikeModel(entity: BikeEntity): BikeModel{
    return {
      id: entity.id,
      brand: entity.brand,
      model : entity.model,
      description: entity.description,
      category: entity.category,
      frameMaterial: entity.frameMaterial,
      frameSizeCm: entity.frameSizeCm,
      wheelSizeInches: entity.wheelSizeInches,
      gearCount: entity.gearCount,
      weightKg: entity.weightKg,
      electric: entity.electric,
      priceCents: entity.priceCents,
    }
  }
}
