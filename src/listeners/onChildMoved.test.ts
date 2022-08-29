import { onChildMoved } from './onChildMoved'
import {
	generateRandomData,
	initializeApp,
	usersCreator,
	Users,
	compareListeners,
} from '../utilForTests'
import { set, push, setPriority, setWithPriority } from '../operations'
import { IsSame, IsTrue, DataSnapshot } from '../types'
import { query } from '../refs'

initializeApp()
const users = usersCreator()

describe('test onChildMoved', () => {
	it('test with nothing', done => {
		const rand = generateRandomData()
		const data = rand.data
		const path = `w` as const
		const ref = users.ref(path)
		expect.hasAssertions()
		const unsub = onChildMoved(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `w/${number}`>
				IsTrue<IsSame<B, A>>()
				compareListeners(`w/0`, dataSnapshot, data)
			},
			{ onlyOnce: false }
		)
		set(ref, data['w']).then(async () => {
			await setPriority(users.ref(`${path}/0`), 1000)
			unsub()
			done()
		})
	})
	it('test with options', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const path = `b/h/${randStringHKey}/m` as const
		const ref = users.ref(path)
		expect.hasAssertions()
		const unsub = onChildMoved(
			query(ref),
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/m/${string}`>
				IsTrue<IsSame<B, A>>()
				compareListeners(`${path}/${randStringMKey}`, dataSnapshot, data)
			},
			{ onlyOnce: false }
		)
		set(ref, data['b']['h'][randStringHKey]!['m']).then(async () => {
			await setPriority(users.ref(`${path}/${randStringMKey}`), 1000)
			unsub()
			done()
		})
	})
	it('test with cancel callback', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringPKey = rand.randStringPKey
		const data = rand.data
		const path = `b/h/${randStringHKey}/p` as const
		const ref = users.ref(path)
		expect.hasAssertions()
		const unsub = onChildMoved(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/p/${string}`>
				IsTrue<IsSame<B, A>>()
				compareListeners(`${path}/${randStringPKey}`, dataSnapshot, data)
			},
			() => {
				//
			}
		)
		push(ref, data['b']['h'][randStringHKey]!['p'][randStringPKey]!).then(
			async thenRef => {
				await setPriority(users.ref(`${path}/${thenRef.key}`), 1000)
				unsub()
				done()
			}
		)
	})
	it('test with options and cancel callback', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const path = `b/h/${randStringHKey}/s` as const
		const ref = users.ref(path)
		expect.hasAssertions()
		const unsub = onChildMoved(
			query(ref),
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/s/${number}`>
				IsTrue<IsSame<B, A>>()
				compareListeners(`${path}/0`, dataSnapshot, data)
			},
			() => {
				//
			},
			{ onlyOnce: true }
		)
		set(ref, data['b']['h'][randStringHKey]!['s']).then(async () => {
			await setWithPriority(
				users.ref(`${path}/0`),
				(data['b']['h'][randStringHKey]!['s'] as { t: number }[])[0]!,
				1000
			)
			unsub()
			done()
		})
	})
	it('test with incorrect path', () => {
		;() => {
			onChildMoved(
				// @ts-expect-error
				users.ref('a'),
				() => {
					//
				}
			)

			onChildMoved(
				// @ts-expect-error
				users.ref('b/c'),
				() => {
					//
				}
			)

			onChildMoved(
				// @ts-expect-error
				users.ref('b/d'),
				() => {
					//
				}
			)

			onChildMoved(
				// @ts-expect-error
				users.ref('b/d/e'),
				() => {
					//
				}
			)

			onChildMoved(
				// @ts-expect-error
				users.ref('b/d/k'),
				() => {
					//
				}
			)
		}
	})
})
