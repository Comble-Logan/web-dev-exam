import {IsInt, Min, Max} from 'class-validator';
import {Type} from "class-transformer";

export class GetBikeDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsInt()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  limit: number = 10;
}
