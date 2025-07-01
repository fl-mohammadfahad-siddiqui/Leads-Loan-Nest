import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Lead } from 'src/leads/leads.model';

@Table({ tableName: 'ckyc' })
export class Ckyc extends Model {
  @Column({ autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
  declare ckyc_id: number;

  @ForeignKey(() => Lead)
  @Column(DataType.INTEGER)
  declare lead_id: number;

  @BelongsTo(() => Lead)
  declare lead: Lead

  @Column(DataType.STRING)
  declare pan: string;

  @Column(DataType.JSON)
  declare response_data: object;
}