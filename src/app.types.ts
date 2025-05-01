export interface Account {
    id: string;
    email: string;
    full_name: string;
    street_1: string;
    street_2?: string;
    city_town: string;
    state_province: string;
    postal_zip_code: string;
    country: string;
}