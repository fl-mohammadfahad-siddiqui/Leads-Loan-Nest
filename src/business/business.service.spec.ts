import { Test, TestingModule } from '@nestjs/testing';
import { BusinessService } from './business.service';
import { getModelToken } from '@nestjs/sequelize';
import { Business } from './business.model';
import { NotFoundException } from '@nestjs/common';
import { BusinessType } from './business-type.enum';

describe('BusinessService', () => {
  let service: BusinessService;

  // 🧪 Mock Sequelize Model
  const mockBusinessModel = {
    create: jest.fn(dto => Promise.resolve({ id: 1, ...dto })),

    findAll: jest.fn(() => Promise.resolve([{ id: 1, business_name: 'Test Biz' }])),

    findByPk: jest.fn(id =>
      id === 1
        ? Promise.resolve({
            id: 1,
            business_name: 'Test Biz',
            update: jest.fn().mockResolvedValue({ id: 1, business_name: 'Updated Biz' }),
            destroy: jest.fn().mockResolvedValue(true),
          })
        : Promise.resolve(null)
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessService,
        {
          provide: getModelToken(Business),
          useValue: mockBusinessModel,
        },
      ],
    }).compile();

    service = module.get<BusinessService>(BusinessService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a business', async () => {
    const dto = {
      lead_id: 1,
      business_name: 'Test Biz',
      business_type: BusinessType.PARTNERSHIP,
      gst_number: '22AAAAA0000A1Z5',
      turnover: 100000,
    };

    const result = await service.create(dto);

    expect(mockBusinessModel.create).toHaveBeenCalledWith(dto);
    expect(result.id).toBe(1);
    expect(result.business_name).toBe('Test Biz');
  });

  it('should return all businesses', async () => {
    const result = await service.findAll();

    expect(mockBusinessModel.findAll).toHaveBeenCalled();
    expect(result).toEqual([{ id: 1, business_name: 'Test Biz' }]);
  });

  it('should return a business by ID', async () => {
    const result = await service.findOne(1);

    expect(mockBusinessModel.findByPk).toHaveBeenCalledWith(1);
    expect(result.id).toBe(1);
    expect(result.business_name).toBe('Test Biz');
  });

  it('should throw NotFoundException if business not found', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    expect(mockBusinessModel.findByPk).toHaveBeenCalledWith(999);
  });

  it('should update a business', async () => {
    const dto = { business_name: 'Updated Biz' };
    
    const result = await service.update(1, dto);

    expect(result).toEqual({ id: 1, business_name: 'Updated Biz' });
  });

  it('should delete a business', async () => {
    const result = await service.remove(1);

    expect(result).toEqual({
      message: 'Business deleted',
      business: {
        id: 1,
        business_name: 'Test Biz',
        update: expect.any(Function),
        destroy: expect.any(Function),
      },
    });
  });
});
