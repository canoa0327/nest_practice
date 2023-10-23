import { 
  // IsEmail,
  // IsIn, 
  // IsPhoneNumber, 
  IsNotEmpty, 
  MaxLength,
  MinLength, 
} from 'class-validator';

export class CreateUserDto {

  @MinLength(2)
  @MaxLength(10)
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;
  
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  // @IsIn(['Female', 'Male',])
  // gender: string;

  // @IsEmail()
  // email: string;

  // @IsPhoneNumber('KR')
  // phoneNumber: string;

}
