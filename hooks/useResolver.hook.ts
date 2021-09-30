import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { MyIsAlphanumeric, MyIsEmail, MyIsNotEmpty, MyIsString, MyMaxLength, MyMinLength } from '../constants/myValidator';

class User {
  @MyMaxLength(16)
  @MyMinLength(2)
  @MyIsAlphanumeric()
  @MyIsString()
  @MyIsNotEmpty()
  // @MyNotContains('A-Za-z')
  nickname: string;
  
  @MyIsEmail()
  @MyIsString()
  @MyIsNotEmpty()
  email: string;
  
  @MyMaxLength(20)
  @MyMinLength(4)
  @MyIsString()
  @MyIsNotEmpty()
  password: string;
  
  @MyMaxLength(20)
  @MyMinLength(4)
  @MyIsString()
  @MyIsNotEmpty()
  confirm: string;

  @MyMaxLength(20)
  @MyMinLength(4)
  @MyIsString()
  @MyIsNotEmpty()
  oldPassword: string;
}

const validators = {
  User: {
    initial: User,
    resolver: classValidatorResolver(User, { skipMissingProperties: true }, {
      mode: 'sync',
    })
  },

};

export const useResolver = (): any => {
  return validators;
};