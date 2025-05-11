import { Snowflake } from '@sapphire/snowflake';

export class Identifier {
  private readonly _value: string;
  private static readonly epoch = 1700000000000n;
  private static readonly snowflake = new Snowflake(this.epoch);

  private constructor(value: string) {
    this._value = value;
  }

  public static create(): Identifier {
    const id = this.snowflake.generate().toString();
    return new Identifier(id);
  }

  public static from(value: string): Identifier {
    return new Identifier(value);
  }

  public get value(): string {
    return this._value;
  }

  public equals(other: Identifier): boolean {
    return this._value === other._value;
  }
}
