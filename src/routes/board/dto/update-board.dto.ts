import { ApiProperty, } from '@nestjs/swagger';
import { IsNotEmpty, } from 'class-validator';

export class UpdateBoardDto {

  @IsNotEmpty()
  @ApiProperty({
    description: '내용',
    required: true,
    example: '내용',
  })
  contents?: string;
}
