import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { join } from 'path';
// import { User } from '../users/entities/users.entity';

export const databaseService = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                ssl: false,
                type: 'postgres',
                host: config.get('DB_HOST'),
                username: config.get('DB_USER'),
                password: config.get('DB_PASSWORD'),
                logging: true,
                entities: [join(process.cwd(), "/dist/apis/**/**/*.entity{.ts,.js}")],
                migrations: [join(process.cwd(), '/src/apis/database/migrations/*{.ts,.js}')],
                synchronize: true
            } as ConnectionOptions
        }
    })
]