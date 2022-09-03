import { IsCharacterValid, ErrorNoInValidCharacter } from '../utils'
import { OrderByConstraint } from './queryConstraint'
/**
Creates a new QueryConstraint that orders by the specified child key.

Queries can only order by one key at a time. Calling orderByChild() multiple times on the same query is an error.

Firebase queries allow you to order your data by any child key on the fly. However, if you know in advance what your indexes will be, you can define them via the .indexOn rule in your Security Rules for better performance. See the https://firebase.google.com/docs/database/security/indexing-data rule for more information.

You can read more about orderByChild() in [Sort data](https://firebase.google.com/docs/database/web/lists-of-data#sort_data).

@param path — The path to order by.
 */
export type OrderByChild = <V extends string>(
	path: V extends never
		? V
		: IsCharacterValid<V, V, ErrorNoInValidCharacter, '/'>
) => OrderByConstraint<'orderByChild', V>
