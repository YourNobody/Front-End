import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import {
  CustomValidatePassword,
  CustomValidateSuggestedAnswers,
  CustomValidateTitle,
  MyIsAlphanumeric,
  MyIsEmail,
  MyIsNotEmpty,
  MyIsString,
  MyMaxLength,
  MyMinLength,
} from '../constants/myValidator'

class User {
  @MyMaxLength(24)
  @MyMinLength(4)
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
  old_password: string;

  @MyMaxLength(20)
  @MyMinLength(4)
  @MyIsString()
  @MyIsNotEmpty()
  new_password: string;
  
  getValidatorFields = (): string[] => {
    return ['confirm', 'password', 'old_password', 'nickname', 'email', 'new_password'];
  };

  validateCustomProperty = (type: 'password' | 'email' | 'nickname', text: string): string | boolean => {
    switch (type) {
      case 'password':
        return CustomValidatePassword(text);
      default: return null;
    }
  };
}

class Quiz {
  @MyMaxLength(30)
  @MyMinLength(10)
  @MyIsString()
  @MyIsNotEmpty()
  // @MyNotContains('A-Za-z')
  title: string;
  
  @MyMaxLength(255)
  @MyMinLength(10)
  @MyIsString()
  @MyIsNotEmpty()
  question: string;
  
  @MyMaxLength(25)
  @MyMinLength(4)
  @MyIsString()
  @MyIsNotEmpty()
  answer: string;

  getValidatorFields = (): string[] => {
    return ['title', 'question', 'answer'];
  };

  validateCustomProperty = (type: 'title' | 'editor' | 'answer', text: string): string | boolean => {
    switch (type) {
      case 'title':
        return CustomValidateTitle(text);
      case 'editor':
        return;
      case 'answer':
        return CustomValidateSuggestedAnswers(text);
      default: return null;
    }
  };
}

const validators = {
  User: {
    resolver: classValidatorResolver(User, {
      skipMissingProperties: true,
      skipUndefinedProperties: true
    }, {
      mode: 'sync'
    }),
    initial: User
  },
  Quiz: {
    resolver: classValidatorResolver(Quiz, {
      skipMissingProperties: true,
      skipUndefinedProperties: true
    }, {
      mode: 'sync'
    }),
    initial: Quiz
  },
  validators: [User, Quiz]
};

export const useResolver = (): any => {
  return validators;
};