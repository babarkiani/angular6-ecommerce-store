import { CustommaterialModule } from './custommaterial.module';

describe('CustommaterialModule', () => {
  let custommaterialModule: CustommaterialModule;

  beforeEach(() => {
    custommaterialModule = new CustommaterialModule();
  });

  it('should create an instance', () => {
    expect(custommaterialModule).toBeTruthy();
  });
});
