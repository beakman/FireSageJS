import { RemoveLastSlash } from './stringManipulation'

type DeepKeyHybridInner<
	T,
	K extends keyof T,
	Mode extends 'read' | 'write'
> = K extends string
	? T[K] extends Record<string, unknown>
		? Mode extends 'write'
			? `${K}/` | `${K}/${DeepKeyHybridInner<T[K], keyof T[K], Mode>}`
			: `${K}/${DeepKeyHybridInner<T[K], keyof T[K], Mode>}`
		: `${K}/`
	: never // impossible route

export type DeepKeyHybrid<T, Mode extends 'read' | 'write'> = RemoveLastSlash<
	DeepKeyHybridInner<T, keyof T, Mode>
>

type DeepValueHybrid<
	T,
	P extends DeepKeyHybrid<T, Mode>,
	Mode extends 'read' | 'write'
> = P extends `${infer K}/${infer Rest}`
	? K extends keyof T
		? Rest extends DeepKeyHybrid<T[K], Mode>
			? DeepValueHybrid<T[K], Rest, Mode>
			: never // impossible route
		: never // impossible route
	: P extends keyof T
	? T[P]
	: never // impossible route

export type ObjectFlattenHybrid<Data> = Data extends Record<string, unknown>
	? {
			[K in DeepKeyHybrid<Data, 'write'>]-?: ObjectFlattenHybrid<
				DeepValueHybrid<Data, K, 'write'>
			>
	  }
	: Data
