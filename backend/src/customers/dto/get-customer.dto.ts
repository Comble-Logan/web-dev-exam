import { IsInt, Max, Min } from 'class-validator';
import {Type} from "class-transformer";

export class GetCustomerDto{
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Max(50)
  limit: number=10;
}

