import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import {
  CardDateMaxLength, CardDateMinLength, CardNumberMaxLength, CardNumberMinLength,
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

class Card {
  @CardNumberMaxLength(19)
  @CardNumberMinLength(19)
  @MyIsString()
  @MyIsNotEmpty()
  card_number: string;

  @CardDateMaxLength(5)
  @CardDateMinLength(5)
  @MyIsString()
  @MyIsNotEmpty()
  card_date: string;

  @MyMaxLength(3)
  @MyMinLength(3)
  @MyIsString()
  @MyIsNotEmpty()
  card_csv: string;

  getValidatorFields = (): string[] => {
    return ['card_csv', 'card_date', 'card_number'];
  };

  validateCustomProperty = (type: 'card_csv' | 'card_date' | 'card_number', text: string): string | boolean => {
    switch (type) {
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
  Card: {
    resolver: classValidatorResolver(Card, {
      skipMissingProperties: true,
      skipUndefinedProperties: true
    }, {
      mode: 'sync'
    }),
    initial: Card
  },
  validators: [User, Quiz, Card]
};

export const useResolver = (): any => {
  return validators;
};