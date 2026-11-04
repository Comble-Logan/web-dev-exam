import {IsString, IsNumber, IsBoolean, Min} from "class-validator";

export class CreateBikeDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsNumber()
  @Min(0.1)
  frameSizeCm: number;

  @IsNumber()
  @Min(0.1)
  wheelSizeInches: number;

  @IsNumber()
  @Min(1)
  gearCount: number;

  @IsNumber()
  @Min(0.001)
  weightKg: number;

  @IsBoolean()
  electric: boolean;

  @IsNumber()
  @Min(0)
  priceCents: number;
}
