import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { IsNotEmpty, validateSync, IsInt } from 'class-validator';
import { plainToClass, Transform } from 'class-transformer';

export class EnvConfig {
  @IsNotEmpty()
  DB_HOST: string;

  @IsNotEmpty()
  DB_USERNAME: string;

  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsNotEmpty()
  DB_DATABASE: string;

  @IsInt()
  @Transform(value => parseInt(value, 10), { toClassOnly: true })
  DB_PORT: number;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.envConfig = this.validate(process.env);
    } else {
      const filepath = `development.env`;
      const parsedConfig = dotenv.parse(fs.readFileSync(filepath));
      this.envConfig = this.validate(parsedConfig);
    }
  }

  private validate(
    parsedConfig: dotenv.DotenvParseOutput | dotenv.DotenvConfigOutput,
  ): EnvConfig {
    const config = plainToClass(EnvConfig, parsedConfig);
    const errors = validateSync(config);
    if (errors.length > 0) {
      throw errors;
    }
    return config;
  }

  get envs(): EnvConfig {
    return this.envConfig;
  }
}
