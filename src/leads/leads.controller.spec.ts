import { Test, TestingModule } from '@nestjs/testing';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { NotFoundException } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadType } from './lead-type.enum';

describe('LeadsController', () => {
  let controller: LeadsController;
  let mockLeadsService: Partial<Record<keyof LeadsService, jest.Mock>>;

  beforeEach(async () => {
    mockLeadsService = {
      findAll: jest.fn(() => Promise.resolve([{ lead_id: 1 }])),
      findOne: jest.fn(id =>
        id === 1
          ? Promise.resolve({ lead_id: 1 })
          : Promise.reject(new NotFoundException('Lead not found')),
      ),
      create: jest.fn(dto =>
        Promise.resolve({ lead_id: 1, ...dto }),
      ),
      update: jest.fn((id, dto) =>
        Promise.resolve({ lead_id: id, ...dto }),
      ),
      remove: jest.fn(id =>
        Promise.resolve({ message: 'Lead deleted', lead: { lead_id: id } }),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [
        {
          provide: LeadsService,
          useValue: mockLeadsService,
        },
      ],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all leads', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ lead_id: 1 }]);
    expect(mockLeadsService.findAll).toHaveBeenCalled();
  });

  it('should return a lead by id', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({ lead_id: 1 });
    expect(mockLeadsService.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException for invalid ID', async () => {
    await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should create a lead', async () => {
    const dto: CreateLeadDto = {
      first_name: 'Alice',
      last_name: 'Smith',
      phone: '9999999999',
      email: 'alice@example.com',
      type: LeadType.APPLICANT,
      dob: '1995-05-10',
      pan_card: 'ABCDEF1234X',
    };

    const result = await controller.create(dto);
    expect(result).toHaveProperty('lead_id');
    expect(mockLeadsService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a lead', async () => {
    const dto: UpdateLeadDto = { first_name: 'Updated' };
    const result = await controller.update(1, dto);
    expect(result.first_name).toBe('Updated');
    expect(mockLeadsService.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a lead', async () => {
    const result = await controller.remove(1);
    expect(result.message).toBe('Lead deleted');
    expect(mockLeadsService.remove).toHaveBeenCalledWith(1);
  });
});
