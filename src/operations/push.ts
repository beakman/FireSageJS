import { push as push_ } from 'firebase/database'
import {
	MetaType,
	DatabaseReference,
	GetAllPushAblePaths,
	GetAllPushAbleOnlyPaths,
	ErrorNotPushAble,
	FindNestedWriteTypeFromFullPath,
	FindAllTopLevelChildKeys,
	GetFullPath,
} from '../types'
/**
Generates a new child location using a unique key and returns its Reference.

This is the most common pattern for adding data to a collection of items.

If you provide a value to push(), the value is written to the generated location. If you don't pass a value, nothing is written to the database and the child remains empty (but you can use the Reference elsewhere).

The unique keys generated by push() are ordered by the current time, so the resulting list of items is chronologically sorted. The keys are also designed to be unguessable (they contain 72 random bits of entropy).

See [Append to a list of data](https://firebase.google.com/docs/database/web/lists-of-data#append_to_a_list_of_data) and [The 2^120 Ways to Ensure Unique Identifiers](https://firebase.blog/posts/2015/02/the-2120-ways-to-ensure-unique_68)

@param parent — The parent location.

@param value —  value to be written at the generated location.

@returns
Combined Promise and Reference; resolves when write is complete, but can be used immediately as the Reference to the child location.
 */
export const push = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	ref: string extends never
		? DatabaseReference<T, U>
		: U extends GetAllPushAblePaths<T> | GetAllPushAbleOnlyPaths<T>
		? DatabaseReference<T, U>
		: ErrorNotPushAble<U>,
	value: FindNestedWriteTypeFromFullPath<T, `${U}/string`>
) => {
	return push_(ref as any, value) as unknown as Promise<
		DatabaseReference<T, GetFullPath<T, U, FindAllTopLevelChildKeys<T, U>>>
	>
}
// ! jsdoc typo
