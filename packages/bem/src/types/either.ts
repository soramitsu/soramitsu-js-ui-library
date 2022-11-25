import { Opaque } from 'type-fest'

declare const either: unique symbol

export type Either<L, R> = Left<L> | Right<R>
export type Left<T> = Opaque<{ type: 'left'; value: T }, typeof either>
export type Right<T> = Opaque<{ type: 'right'; value: T }, typeof either>
