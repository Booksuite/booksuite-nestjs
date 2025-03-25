import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator'

export function IsWeekDays(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isWeekDays',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if (!Array.isArray(value)) {
                        return false
                    }
                    return value.every((day: number) => {
                        return typeof day === 'number' && day >= 0 && day <= 6
                    })
                },

                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be an array of numbers between 0 and 6 representing weekdays`
                },
            },
        })
    }
}
