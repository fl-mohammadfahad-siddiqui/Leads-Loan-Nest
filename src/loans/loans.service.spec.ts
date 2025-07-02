import { Test, TestingModule } from '@nestjs/testing';
import { LoansService } from './loans.service';
import { getModelToken } from '@nestjs/sequelize';
import { Loan } from './loans.model';
import { NotFoundException } from '@nestjs/common';
import { LoanStatus } from './loan-status.enum';

describe('LoansService', () => {
  let service: LoansService;

  // 🧪 Mock Sequelize Model
  const mockLoanModel = {
    create: jest.fn(dto => Promise.resolve({ loan_id: 1, ...dto })),
    findAll: jest.fn(() => Promise.resolve([{ loan_id: 1 }])),
    findByPk: jest.fn(id =>
      id === 1
        ? Promise.resolve({
            loan_id: 1,
            update: jest.fn().mockResolvedValue(true),
            destroy: jest.fn().mockResolvedValue(true),
            toJSON: () => ({
              loan_id: 1,
              lead_id: 1,
              business_id: 1,
              loan_amount: 500000,
            }),
            lead: { lead_id: 1 },
            business: { business_id: 1 },
          })
        : Promise.resolve(null)
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoansService,
        {
          provide: getModelToken(Loan),
          useValue: mockLoanModel,
        },
      ],
    }).compile();

    service = module.get<LoansService>(LoansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a loan', async () => {
    const dto = {
      lead_id: 1,
      business_id: 1,
      amount: 500000,
      tenure_months: 12,
      status: LoanStatus.PENDING,
    };
    const result = await service.create(dto);
    expect(result).toHaveProperty('loan_id');
    expect(mockLoanModel.create).toHaveBeenCalledWith(dto);
  });

  it('should return all loans', async () => {
    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('loan_id');
  });

  it('should return one loan by ID', async () => {
    const result = await service.findOne(1);
    expect(result.loan_id).toBe(1);
  });

  it('should throw NotFoundException for missing loan', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a loan', async () => {
    const dto = { amount: 600000 };
    const updated = await service.update(1, dto);
    expect(updated).toBeTruthy();
  });

  it('should delete a loan', async () => {
    const result = await service.remove(1);
    expect(result.message).toBe('Loan Deleted');
  });
});
