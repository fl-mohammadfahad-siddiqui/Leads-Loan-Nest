import { Optional } from "sequelize";
import { Model } from "sequelize-typescript"
import { BelongsTo, Column, DataType, ForeignKey, Table, Unique } from "sequelize-typescript";
import { Lead } from "src/leads/leads.model";
import { BusinessType } from "./business-type.enum";



export interface BusinessAttributes{
    business_id: number;
    lead_id: number;
    business_name: string;
    business_type: string;
    gst_number?: string;
    turnover: number;
}

export interface BusinessCreationAttributes extends Optional<BusinessAttributes, 'business_id'> {}

@Table({ tableName: 'businesses' })
export class Business extends Model<BusinessAttributes,BusinessCreationAttributes>{
    
    @Column({ 
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare business_id: number;

    @ForeignKey(() => Lead)
    @Column({ type: DataType.INTEGER})
    declare lead_id: number;

    @BelongsTo(() => Lead)
    declare lead:Lead

    @Column({ type: DataType.STRING })
    declare business_name: string;

    @Column(DataType.ENUM(...Object.values(BusinessType)))
    declare business_type: BusinessType;

    @Unique
    @Column(DataType.STRING)
    declare gst_number?: string;

    @Column(DataType.FLOAT)
    declare turnover: number;
}