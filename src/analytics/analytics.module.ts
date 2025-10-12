import { init } from '@amplitude/analytics-node';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AnalyticsService } from './infrastructure/analytics.service';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthEventsHandler } from './application/auth-event.handler';

export const AMPLITUDE_CLIENT = Symbol('AMPLITUDE_CLIENT');

@Module({
  imports: [ConfigModule, CqrsModule],
  providers: [
    {
      provide: 'AMPLITUDE_CLIENT',
      useFactory: (configService: ConfigService) => {
        return init(configService.getOrThrow<string>('amplitude.apiKey'), {
          flushIntervalMillis: 1000,
        });
      },
      inject: [ConfigService],
    },
    AnalyticsService,
    AuthEventsHandler,
  ],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
