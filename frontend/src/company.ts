import { Deal } from "./deal";

export interface Company {
    name: string,
    country: string,
    founding_date: string,
    description: string,
    company_id: number,
    deals?: Deal[],
}