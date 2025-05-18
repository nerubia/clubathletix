import { Customer, Organization } from "../customer/types";

export interface Testimonial {
    id: number;
    organization: Organization;
    body: string;
    customer: Customer;
    feature?: boolean;
}