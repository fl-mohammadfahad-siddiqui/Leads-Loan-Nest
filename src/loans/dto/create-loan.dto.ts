import { IsEnum, IsNumber } from "class-validator";
import { LoanStatus } from "../loan-status.enum";


export class CreateLoanDto{

    @IsNumber()
    lead_id: number;

    @IsNumber()
    business_id: number;

    @IsNumber()
    amount: number;

    @IsNumber()
    tenure_months: number;

    @IsEnum(LoanStatus)
    status: LoanStatus;

}