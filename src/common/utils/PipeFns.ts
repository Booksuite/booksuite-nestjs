import { Injectable } from '@nestjs/common'

@Injectable()
export class PipeFns {
    pipe<T>(...fns: ((value: T) => T)[]): (value: T) => T {
        return (value: T) => fns.reduce((acc, fn) => fn(acc), value)
    }

    pipeAsync<T>(
        ...fns: ((value: T) => Promise<T> | T)[]
    ): (value: T) => Promise<T> {
        return async (value: T) => {
            for (const fn of fns) {
                value = await Promise.resolve(fn(value))
            }
            return value
        }
    }
}
