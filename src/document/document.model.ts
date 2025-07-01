import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Loan } from 'src/loans/loans.model';

@Table({ tableName: 'documents' })
export class Document extends Model {
  @Column({ autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
  declare document_id: number;

  @ForeignKey(() => Loan)
  @Column(DataType.INTEGER)
  declare loan_id: number;

  @BelongsTo(() => Loan)
  declare loan: Loan;

  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare type: string;

  @Column(DataType.INTEGER)
  declare size: number;

  @Column(DataType.STRING)
  declare path: string;
}
