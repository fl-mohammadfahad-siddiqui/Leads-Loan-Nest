import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Lead } from '../leads/leads.model';

@Table({ tableName: 'guarantor' })
export class Guarantor extends Model {
  @Column({ autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
  declare guarantor_id: number;

  @ForeignKey(() => Lead)
  @Column(DataType.INTEGER)
  declare lead_id: number;

  @BelongsTo(() => Lead)
  declare lead: Lead;

  @Column(DataType.STRING)
  declare first_name: string;

  @Column(DataType.STRING)
  declare last_name: string;

  @Column(DataType.STRING)
  declare mobile: string;

  @Column(DataType.STRING)
  declare pan_card: string;
} 