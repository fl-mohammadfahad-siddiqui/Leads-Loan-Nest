import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BusinessType } from "../business-type.enum";


export class CreateBusinessDto{
    @IsNumber()
    lead_id: number;

    @IsString()
    @IsNotEmpty()
    business_name: string;

    @IsEnum(BusinessType, {
        message: 'Invalid business type'
    })
    business_type: BusinessType;

    @IsOptional()
    @IsString()
    gst_number?: string;

    @IsNumber()
    turnover: number;


}