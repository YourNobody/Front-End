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

export const CardDateMinLength = (min: number): PropertyDecorator => MinLength(min, {
  message: M.MinLength(min - 1)
});

export const CardDateMaxLength = (max: number): PropertyDecorator => MaxLength(max, {
  message: M.MaxLength(max - 1)
});

export const CardNumberMinLength = (min: number): PropertyDecorator => MinLength(min, {
  message: M.MinLength(min - 3)
});

export const CardNumberMaxLength = (max: number): PropertyDecorator => MaxLength(max, {
  message: M.MaxLength(max - 3)
});

export const MyIsAlphanumeric = (locale?: string): PropertyDecorator => IsAlphanumeric(locale, {
  message: M.IsAlphanumeric
});

export const MyNotContains = (seed?: string): PropertyDecorator => NotContains(seed, {
  message: M.NotContains(seed)
});

export const CustomValidateTitle = (title: string): string | null => {
  if (!title) return M.IsNotEmpty;
  if (typeof title !== 'string') return M.isString;
  if (title.length < 10) return M.MinLength(10);
  if (title.length > 40) return M.MaxLength(40);
  return null;
};

export const CustomValidateSuggestedAnswers = (answer: string): string | null => {
  if (!answer) return M.IsNotEmpty;
  if (typeof answer !== 'string') return M.isString;
  if (answer.length < 10) return M.MinLength(5);
  if (answer.length > 40) return M.MaxLength(40);
  return null;
};
export const CustomValidatePassword = (answer: string): string | null => {
  if (!answer) return M.IsNotEmpty;
  if (typeof answer !== 'string') return M.isString;
  if (answer.length < 4) return M.MinLength(4);
  if (answer.length > 20) return M.MaxLength(20);
  return null;
};

