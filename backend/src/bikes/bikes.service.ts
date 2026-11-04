import { Injectable, BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";
import {BikesRepository} from "./bikes.repository";
import type {CreateBikeDto} from "./dto/create-bike.dto";
import type {UpdateBikeDto} from "./dto/update-bike.dto";
import {BikeModel} from "./models/bike.model";
import type {CustomerModel, UpdateCustomerModel} from "../customers/models/customer.model";


@Injectable()
export class BikesService {
  constructor(private readonly bikesRepository: BikesRepository) {}

  async findAll(page: number, limit: number): Promise<{ totalCount: number; bikes: BikeModel[] }> {
    return this.bikesRepository.findAll(page, limit);
  }

  async findById(id: string): Promise<BikeModel> {
    const bike = await this.bikesRepository.findById(id);
    if (!bike) {throw new NotFoundException(`Bike not found`);}
    return bike;
  }

  async create(input: CreateBikeDto): Promise<BikeModel> {
    try {
      return await this.bikesRepository.create(input);
    } catch (error) {
     throw error;
    }
  }

  async update(id: string, input: UpdateBikeDto): Promise<BikeModel> {
    if (!Object.values(input).some((value) => value !== undefined))
      throw new BadRequestException("At least one field must be supplied");
    const update = { ...input };
    try {
      return await this.bikesRepository.update(id, input);
    } catch (error: any) {
      if (error.message?.includes("not found")) {
        throw new NotFoundException(`Bike not found`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    if (!(await this.bikesRepository.delete(id)))
      throw new NotFoundException("bike not found");
  }
}
