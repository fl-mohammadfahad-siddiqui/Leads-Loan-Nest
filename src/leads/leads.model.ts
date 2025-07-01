import { Table, Column, Model, DataType, Unique } from 'sequelize-typescript';
import { LeadType } from './lead-type.enum';
import { Optional } from 'sequelize';


export interface LeadAttributes {
    lead_id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    type: LeadType;
    dob: Date;
    pan_card: string;
}

export interface LeadCreationAttributes extends Optional<LeadAttributes, 'lead_id'> {}

@Table({ tableName: 'leads' })
export class Lead extends Model<LeadAttributes,LeadCreationAttributes> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare lead_id: number;

  @Column(DataType.STRING)
  declare first_name: string;

  @Column(DataType.STRING)
  declare last_name: string;

  @Unique
  @Column(DataType.STRING)
  declare phone: string;

  @Unique
  @Column(DataType.STRING)
  declare email: string;

  @Column(DataType.ENUM(...Object.values(LeadType)))
  declare type: LeadType;

  @Column(DataType.DATEONLY)
  declare dob: Date;

  @Unique
  @Column(DataType.STRING(10))
  declare pan_card: string;
}
