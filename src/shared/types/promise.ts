export type PromiseValue<T> = T extends Promise<infer P> ? P : T;
