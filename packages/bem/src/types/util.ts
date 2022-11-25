export * as either from './either'

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

export type NotEqual<X, Y> = Equal<X, Y> extends true ? false : true

export type Expect<T extends true> = T

// export type Either<L, R> =  Left<L> | { type: 'right'; value: R }

// export type Left<T> = { type: 'left'; value: T }
