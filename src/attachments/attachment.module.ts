import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AttachmentController } from './attachment.controller';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.registerAsync(
      {
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          storage: diskStorage({
            destination: configService.get('FILES_FOLDER'),
            filename: (req, file, cb) => {
              return cb(null, file.originalname)
            }
          })
        }),
        inject: [ConfigService]
      }
    )
  ],
  controllers: [AttachmentController],
  providers: [Logger],
})
export class AttachmentModule {}
