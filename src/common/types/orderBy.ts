import { Order } from '../enum/Order'

export interface OrderByRequest {
    orderBy: string
    order: Order
}
