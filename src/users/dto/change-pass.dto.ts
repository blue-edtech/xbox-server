import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class changePassDto {
  @ApiProperty({
    description: 'Old password for the user',
    example: 'Blue2021',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'New password for the user',
    example: 'Blue2022#',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'New password again for the user',
    example: 'Blue2022#',
  })
  @IsString()
  @IsNotEmpty()
  confPassword: string;
}
