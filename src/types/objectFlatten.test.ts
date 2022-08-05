import { ObjectFlattenHybrid, DeepKeyHybrid } from './objectFlatten'
import { IsTrue, IsSame } from './utils'
import { Users } from '../utilForTests'
import { ReplaceInvalidDataType } from './replaceInvalidData'

describe('test object flatten type', () => {
	it('test DeepKeyHybrid', () => {
		type A = DeepKeyHybrid<
			{
				a: 1
				b: {
					c: 2
					d: {
						e: 5
						f: Record<string, boolean>
						g: Record<string, Record<string, { i: 1 }>>
					}
				}
			},
			'write'
		>

		IsTrue<
			IsSame<
				A,
				| 'a'
				| 'b'
				| 'b/c'
				| 'b/d'
				| 'b/d/e'
				| 'b/d/f'
				| `b/d/f/${string}`
				| 'b/d/g'
				| `b/d/g/${string}`
				| `b/d/g/${string}/${string}`
				| `b/d/g/${string}/${string}/i`
			>
		>
	})
	it('test flatten read type of complex data structure', () => {
		type A = Users['read']
		type B = ObjectFlattenHybrid<ReplaceInvalidDataType<A>>

		IsTrue<
			IsSame<
				B,
				{
					a: 1 | 2 | 3
					b: {
						c: true
						d: {
							e: 'abc' | 'xyz' | 'efg'
							f: {
								j: number
							}
							'f/j': number
							k: string
						}
						h: Record<
							string,
							{
								i: boolean
								l: number
								m: { [x: string]: { n: '7' | '8' | '9' } }
								[x: `m/${string}`]: { n: '7' | '8' | '9' }
								[x: `m/${string}/n`]: '7' | '8' | '9'
							}
						>
						[x: `h/${string}`]: {
							i: boolean
							l: number
							m: {
								[x: string]: { n: '7' | '8' | '9' }
							}
							[x: `m/${string}`]: { n: '7' | '8' | '9' }
							[x: `m/${string}/n`]: '7' | '8' | '9'
						}
						[x: `h/${string}/i`]: boolean
						[x: `h/${string}/l`]: number
						[x: `h/${string}/m`]: { [x: string]: { n: '7' | '8' | '9' } }
						[x: `h/${string}/m/${string}`]: { n: '7' | '8' | '9' }
						[x: `h/${string}/m/${string}/n`]: '7' | '8' | '9'
						'd/e': 'abc' | 'xyz' | 'efg'
						'd/f': {
							j: number
						}
						'd/f/j': number
						'd/k': string
					}
					'b/c': true
					'b/d': {
						e: 'abc' | 'xyz' | 'efg'
						f: {
							j: number
						}
						'f/j': number
						k: string
					}
					'b/d/e': 'abc' | 'xyz' | 'efg'
					'b/d/f': {
						j: number
					}
					'b/d/f/j': number
					'b/d/k': string
					'b/h': Record<
						string,
						{
							i: boolean
							l: number
							m: { [x: string]: { n: '7' | '8' | '9' } }
							[x: `m/${string}`]: { n: '7' | '8' | '9' }
							[x: `m/${string}/n`]: '7' | '8' | '9'
						}
					>
					[x: `b/h/${string}`]: {
						i: boolean
						l: number
						m: { [x: string]: { n: '7' | '8' | '9' } }
						[x: `m/${string}`]: { n: '7' | '8' | '9' }
						[x: `m/${string}/n`]: '7' | '8' | '9'
					}
					[x: `b/h/${string}/i`]: boolean
					[x: `b/h/${string}/l`]: number
					[x: `b/h/${string}/m`]: { [x: string]: { n: '7' | '8' | '9' } }
					[x: `b/h/${string}/m/${string}`]: { n: '7' | '8' | '9' }
					[x: `b/h/${string}/m/${string}/n`]: '7' | '8' | '9'
				}
			>
		>
	})
	it('test primitive type', () => {
		type A = false | null | string | number
		type B = ObjectFlattenHybrid<A>

		IsTrue<IsSame<B[], A[]>>
	})
	it('test unknown type', () => {
		type A = unknown
		type B = ObjectFlattenHybrid<A>

		IsTrue<IsSame<B[], A[]>>
	})
	it('test never type', () => {
		type A = never
		type B = ObjectFlattenHybrid<A>

		IsTrue<IsSame<B[], A[]>>
	})
})
