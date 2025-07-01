import { IsDateString, IsEnum, IsString, Length } from "class-validator";
import { LeadType } from "../lead-type.enum";


export class CreateLeadDto{
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    phone: string;

    @IsString()
    email: string;

    @IsEnum(LeadType, {message: 'type must be either applicant or guarantor'})
    type: LeadType;

    @IsDateString()
    dob: string;

    @Length(10,10)
    pan_card: string;
}