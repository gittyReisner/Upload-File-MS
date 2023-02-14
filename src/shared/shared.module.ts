import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `config/${process.env.ENV || 'default'}.cfg`,
      expandVariables: true,
    }),
  ],
  exports: [ConfigModule],
})
export class SharedModule {}
