import { onChildMoved as onChildMoved_ } from 'firebase/database'
import { ListenOptions, OnChildMoved } from '../types'
import { isOptions } from '../utils'

export const onChildMoved: OnChildMoved = (
	query,
	callback,
	cancelCallback?: ((error: Error) => unknown) | ListenOptions,
	options?: ListenOptions
) => {
	const cancelCallback_ = isOptions(cancelCallback) ? undefined : cancelCallback
	const options_ =
		options || (isOptions(cancelCallback) ? cancelCallback : undefined)
	if (cancelCallback_ && options_) {
		// @ts-expect-error
		return onChildMoved_(query, callback, cancelCallback_, options_)
	} else if (cancelCallback_ && !options_) {
		// @ts-expect-error
		return onChildMoved_(query, callback, cancelCallback_)
	} else if (!cancelCallback_ && options_) {
		// @ts-expect-error
		return onChildMoved_(query, callback, options_)
	} else {
		// @ts-expect-error
		return onChildMoved_(query, callback)
	}
}
