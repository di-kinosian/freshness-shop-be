import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Messages } from './main/constants/messages.constants';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it(Messages.SHOULD_RETURN_HELLO_WORLD, () => {
      expect(appController.getHello()).toBe(Messages.HELLO_WORLD);
    });
  });
});
