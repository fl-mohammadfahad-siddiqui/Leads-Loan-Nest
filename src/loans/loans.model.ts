import { Optional } from "sequelize";
import { LoanStatus } from "./loan-status.enum";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table, HasMany } from "sequelize-typescript";
import { Lead } from "src/leads/leads.model";
import { Business } from "src/business/business.model";
import { Document } from "src/document/document.model";


export interface LoanAttributes{
    loan_id: number;
    lead_id: number;
    business_id: number;
    amount: number;
    tenure_months: number;
    status: LoanStatus;
}

export interface LoanCreationAttributes extends Optional<LoanAttributes, 'loan_id'> {}

@Table({ tableName: 'loans'})
export class Loan extends Model<LoanAttributes,LoanCreationAttributes> {
    
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    declare loan_id: number

    @ForeignKey(() => Lead)
    @Column({ type: DataType.INTEGER})
    declare lead_id: number

    @ForeignKey(() => Business)
    @Column(DataType.INTEGER)
    declare business_id: number

    @BelongsTo(() => Lead)
    declare lead: Lead

    @BelongsTo(() => Business)
    declare business: Business

    @Column(DataType.FLOAT)
    declare amount: number

    @Column(DataType.INTEGER)
    declare tenure_months: number

    @Column(DataType.ENUM(...Object.values(LoanStatus)))
    declare status: LoanStatus;
    
    @HasMany(() => Document)
    declare documents: Document[];
}