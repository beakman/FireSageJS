import { set as set_ } from 'firebase/database'
import { DatabaseReference, MetaType, FindNestedType } from '../types'

export const set = <
	T extends MetaType,
	U extends (keyof T['flattenRoot'] & string) | undefined,
	V extends FindNestedType<T, U>
>(
	ref: DatabaseReference<T, U>,
	value: V
) => {
	return set_(ref, value)
}
