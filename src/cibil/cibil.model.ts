import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Lead } from '../leads/leads.model';

@Table({ tableName: 'cibil_reports' })
export class Cibil extends Model {
  @Column({ autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
  declare cibil_id: number;

  @ForeignKey(() => Lead)
  @Column(DataType.INTEGER)
  declare lead_id: number;

  @BelongsTo(() => Lead)
  declare lead: Lead

  @Column(DataType.STRING)
  declare score: string;

  @Column(DataType.STRING)
  declare score_date: string;

  @Column(DataType.JSON)
  declare reason_codes: object;

  @Column(DataType.JSON)
  declare raw_response: object;
}


