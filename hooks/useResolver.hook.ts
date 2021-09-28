import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length, Match } from 'class-validator';

const Resolver = {};

export const useResolver = () => {
  return Resolver;
};

class User{
  @IsString()
  @Length(2, 16)
  @IsNotEmpty()
  @IsAlphanumeric()
  nickname: string;
  
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 20)
  @IsNotEmpty()
  password: string;

  @IsString()
  @Match('password')
  confirm: string;
  oldPassword: string;
}

const validators = {
  User, 
};