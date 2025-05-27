//TODO описать DTO для запросов к /films
import {
  IsArray,
  IsFQDN,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateFilmDto {
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  tags: string[];
  @IsFQDN()
  image: string;
  @IsFQDN()
  cover: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  schedule: GetScheduleDTO[];
}

export class GetScheduleDTO {
  @IsString()
  id: string;
  @IsString()
  daytime: string;
  @IsNumber()
  hall: number;
  @IsNumber()
  rows: number;
  @IsNumber()
  seats: number;
  @IsNumber()
  price: number;
  @IsArray()
  taken: string[];
}

export class GetFilmDTO {
  @IsString()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  @IsArray()
  tags: string[];
  @IsFQDN()
  image: string;
  @IsFQDN()
  cover: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  schedule: GetScheduleDTO[];
}
