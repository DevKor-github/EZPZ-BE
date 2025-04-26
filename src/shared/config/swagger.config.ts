import { DocumentBuilder } from '@nestjs/swagger';

export function swaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Univent API')
    .setDescription('Univent API Documentation')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local environment')
    .addBearerAuth()
    .build();
}
