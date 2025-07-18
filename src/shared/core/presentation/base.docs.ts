import { applyDecorators } from '@nestjs/common';

type Decorator = ReturnType<typeof applyDecorators>;

type DocsMap<T extends string> = Record<T, () => Decorator>;

export function createDocs<T extends string>(map: DocsMap<T>) {
  return (endpoint: T): Decorator => {
    const decorator = map[endpoint];
    if (!decorator) throw new Error(`No docs defined for endpoint: ${endpoint}`);
    return decorator();
  };
}
