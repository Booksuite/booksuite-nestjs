import { OrderDirection } from '../enum/Order'

export interface OrderByRequest {
    orderBy: string
    direction: OrderDirection
}
