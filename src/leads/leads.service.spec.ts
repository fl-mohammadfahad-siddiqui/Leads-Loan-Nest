import { Test, TestingModule } from '@nestjs/testing';
import { LeadsService } from './leads.service';
import { getModelToken } from '@nestjs/sequelize';
import { Lead } from './leads.model';
import { NotFoundException } from '@nestjs/common';
import { LeadType } from './lead-type.enum';

describe('LeadsService', () => {
  let service: LeadsService;

  const mockLeadModel = {
    create: jest.fn(dto => Promise.resolve({ lead_id: 1, ...dto })),
    findAll: jest.fn(() => Promise.resolve([{ lead_id: 1 }])),
    findByPk: jest.fn(id => id === 1 ? Promise.resolve({ lead_id: 1, update: jest.fn().mockResolvedValue(true), destroy: jest.fn().mockResolvedValue(true) }) : Promise.resolve(null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: getModelToken(Lead),
          useValue: mockLeadModel,
        },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a lead', async () => {
    const dto = {
      first_name: 'John',
      last_name: 'Doe',
      phone: '1234567890',
      email: 'john@example.com',
      type: LeadType.APPLICANT,
      dob: '1990-01-01',
      pan_card: 'ABCDE1234F',
    };

    const result = await service.create(dto);
    expect(result).toHaveProperty('lead_id');
    expect(mockLeadModel.create).toHaveBeenCalled();
  });

  it('should return all leads', async () => {
    const result = await service.findAll();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return a single lead by id', async () => {
    const result = await service.findOne(1);
    expect(result.lead_id).toBe(1);
  });

  it('should throw NotFoundException for missing lead', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a lead', async () => {
    const dto = { first_name: 'Jane' };
    const updated = await service.update(1, dto);
    expect(updated).toBeTruthy();
  });

  it('should delete a lead', async () => {
    const result = await service.remove(1);
    expect(result.message).toBe('Lead deleted');
  });
});