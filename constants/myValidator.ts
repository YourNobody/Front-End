import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength, NotContains, ValidationOptions } from 'class-validator';

export const M = {
  isString: 'This\'s something wrong, not a string',
  IsNotEmpty: 'This field is required, believe me',
  IsEmail: 'Enter something simuliar to email address',
  MinLength: (num: number): string => `You entered less than ${num} symbols`,
  MaxLength: (num: number): string => `You entered more than ${num} symbols`,
  IsAlphanumeric: 'Nickname contains only letters and numbers',
  NotContains: (seed: string): string => `This field should contain ${seed}`
};

export const MyIsString = (): PropertyDecorator => IsString({
  message: M.isString
});

export const MyIsNotEmpty = (): PropertyDecorator => IsNotEmpty({
  message: M.IsNotEmpty
});

export const MyIsEmail = (opts?: any, validationOpts?: ValidationOptions): PropertyDecorator => IsEmail(opts, {
  ...validationOpts,
  message: M.IsEmail
});

export const MyMinLength = (min: number): PropertyDecorator => MinLength(min, {
  message: M.MinLength(min)
});

export const MyMaxLength = (max: number): PropertyDecorator => MaxLength(max, {
  message: M.MaxLength(max)
});

export const MyIsAlphanumeric = (locale?: string): PropertyDecorator => IsAlphanumeric(locale, {
  message: M.IsAlphanumeric
});

export const MyNotContains = (seed?: string): PropertyDecorator => NotContains(seed, {
  message: M.NotContains(seed)
});
