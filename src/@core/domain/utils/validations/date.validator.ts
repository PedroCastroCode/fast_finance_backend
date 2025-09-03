import {
  isDate,
  isDateString,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export function IsValidDateOrStringDate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidDateOrStringDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string) {
          if (!value || isDate(value) || isDateString(value)) {
            return true;
          } else {
            return false;
          }
        },
      },
    });
  };
}
