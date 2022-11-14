import { Test, TestingModule } from '@nestjs/testing';
import { HttpUtilityService } from './http-utility.service';

describe('HttpUtilityService', () => {
  let service: HttpUtilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpUtilityService],
    }).compile();

    service = module.get<HttpUtilityService>(HttpUtilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
