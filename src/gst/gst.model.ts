// src/gst/gst.model.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Lead } from 'src/leads/leads.model';

@Table({ tableName: 'gst_reports' })
export class Gst extends Model {
  @Column({ autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
  declare gst_id: number;

  @ForeignKey(() => Lead)
  @Column(DataType.INTEGER)
  declare lead_id: number;

  @BelongsTo(() => Lead)
  declare lead: Lead

  @Column(DataType.STRING)
  declare gstin: string;

  @Column(DataType.STRING)
  declare taxpayer_name: string;

  @Column(DataType.STRING)
  declare tradename: string;

  @Column(DataType.DATE)
  declare registration_date: Date;

  @Column(DataType.STRING)
  declare constitution: string;

  @Column(DataType.STRING)
  declare status: string;

  @Column(DataType.STRING)
  declare center: string;

  @Column(DataType.STRING)
  declare state: string;

  @Column(DataType.JSON)
  declare nature: object;

  @Column(DataType.JSON)
  declare address: object;

  @Column(DataType.JSON)
  declare raw_response: object;
}
