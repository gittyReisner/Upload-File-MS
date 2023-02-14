import { Logger } from '@nestjs/common';
import { AttachmentController } from './attachment.controller';

describe('ExampleController', () => {
  let exampleController: AttachmentController;
  let loggerMock: Partial<Logger>;

  beforeEach(async () => {
    loggerMock = {
      error: jest.fn(),
      debug: jest.fn(),
    };

    exampleController = new AttachmentController(loggerMock as Logger);

  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      exampleController.uploadFile();
    });
  });
});
