import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    description: 'Title of profile',
    example: 'leoruiz197',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Image URL of profile',
    // eslint-disable-next-line prettier/prettier
    example: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
  })
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  imageURL: string;

  @ApiProperty({
    description: 'User`s id (UUID) profile`s owner',
    example: '8f20f5f2-332a-42f4-9d86-f760feb22a77',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
