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
  MyMinLength, ValidatorsClassNames,
} from '../constants/myValidator'
import {Resolver} from "react-hook-form/dist/types/resolvers";
import {isBase64} from "class-validator";

export class User {
  @MyIsEmail()
  @MyIsString()
  @MyIsNotEmpty()
  email: string;

  @MyMaxLength(20)
  @MyMinLength(4)
  @MyIsString()
  @MyIsNotEmpty()
  oldPassword: string;

  @MyMaxLength(20)
  @MyMinLength(4)
  @MyIsString()
  @MyIsNotEmpty()
  password: string;

  @MyMaxLength(24)
  @MyMinLength(4)
  @MyIsString()
  @MyIsNotEmpty()
    // @MyNotContains('A-Za-z')
  nickname: string;

  @MyMaxLength(20)
  @MyMinLength(4)
  @MyIsString()
  @MyIsNotEmpty()
  confirm: string;
}

export class Card {
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
}

export class Quiz {
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

  quizAvatar: string;
  
  @MyMaxLength(25)
  @MyMinLength(4)
  @MyIsString()
  @MyIsNotEmpty()
  answer: string;

  answers: any[];

  variants: any[];

  multiple: boolean;
}

export function addClassValidationResolver<TFieldValues, TContext extends object = object>(ClassValidator):
  Resolver<TFieldValues, TContext>
{
  return classValidatorResolver(
    ClassValidator, {
      skipMissingProperties: true,
      skipUndefinedProperties: true,
      always: true
    }, {
      mode: 'sync'
    });
}
