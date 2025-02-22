export type NonOptionalId<T> = T & {
    id: string
}

export type HasProps<T extends object> = keyof T extends never ? never : T
