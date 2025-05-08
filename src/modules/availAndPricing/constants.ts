import { ReservationStatus } from '@prisma/client'

import { UnavailabilityReason } from './enum/UnavailableReason.enum'

export const OCCUPIED_RESERVATION_STATUS: ReservationStatus[] = [
    ReservationStatus.CONFIRMED,
    ReservationStatus.CHECKED_IN,
    ReservationStatus.WAITING_PAYMENT,
]

export const UNAVAILABLE_REASON_MESSAGE: Record<UnavailabilityReason, string> =
    {
        MIN_DAYS_NOT_REACHED:
            'Os dias selecionados não atendem ao mínimo de dias necessários para a reserva',
        ALL_ROOMS_OCCUPIED: 'Todos quartos estão ocupados',
        WEEKDAY_NOT_AVAILABLE:
            'Este dia da semana não está disponível para hospedagem',
        MAX_GUESTS_EXCEEDED: 'O número de hóspedes excede o máximo permitido',
        MAX_CHILDREN_EXCEEDED: 'O número de crianças excede o máximo permitido',
        ITEM_UNAVAILABLE: 'Um ou mais itens selecionados não estão disponíveis',
    }
