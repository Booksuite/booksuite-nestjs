export interface BookPayload {
    status: string;
    startDate: Date;
    endDate: Date;
    totalDays: number | null;
    adults: number;
    children: number;
    saleChannel: string;
    notes: string;
    propertyId: number;
}
