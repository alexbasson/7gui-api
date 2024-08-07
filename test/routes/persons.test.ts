import { test } from 'node:test'
import * as assert from 'node:assert'
import {build, TestContext} from '../helper.js'

test('persons API journey', async (t: TestContext) => {
  const app = await build(t)

  let res = await app.inject({
    url: '/persons',
  })

  assert.deepEqual(JSON.parse(res.payload), [])

  // create Alice
  res = await app.inject({
    method: 'POST',
    url: '/persons',
    payload: createPayload('Alice', 'Awesome'),
  })

  const alice = person(1, 'Alice', 'Awesome')
  assert.deepEqual(JSON.parse(res.payload), alice)

  res = await app.inject({
    url: '/persons'
  })
  assert.deepEqual(JSON.parse(res.payload), [alice])

  // create Bob
  res = await app.inject({
    method: 'POST',
    url: '/persons',
    payload: createPayload('Bob', 'Builder'),
  })

  const bob = person(2, 'Bob', 'Builder')
  assert.deepEqual(JSON.parse(res.payload), bob)

  res = await app.inject({
    url: '/persons'
  })
  assert.deepEqual(JSON.parse(res.payload), [alice, bob])

  // create Clara
  res = await app.inject({
    method: 'POST',
    url: '/persons',
    payload: createPayload('Clara', 'Creative'),
  })

  const clara = person(3, 'Clara', 'Creative')
  assert.deepEqual(JSON.parse(res.payload), clara)

  res = await app.inject({
    url: '/persons'
  })
  assert.deepEqual(JSON.parse(res.payload), [alice, bob, clara])

  // create Dan
  res = await app.inject({
    method: 'POST',
    url: '/persons',
    payload: createPayload('Dan', 'Dreamer'),
  })

  const dan = person(4, 'Dan', 'Dreamer')
  assert.deepEqual(JSON.parse(res.payload), dan)

  res = await app.inject({
    url: '/persons'
  })
  assert.deepEqual(JSON.parse(res.payload), [alice, bob, clara, dan])

  // update Clara
  res = await app.inject({
    method: 'PUT',
    url: '/persons/' + clara.id,
    payload: updatePayload('Carla', 'Curious'),
  })

  const carla = person(clara.id, 'Carla', 'Curious')
  assert.deepEqual(JSON.parse(res.payload), carla)

  res = await app.inject({
    url: '/persons'
  })
  assert.deepEqual(JSON.parse(res.payload), [alice, bob, carla, dan])

  // delete Bob
  await app.inject({
    method: 'DELETE',
    url: '/persons/' + bob.id,
  })

  res = await app.inject({
    url: '/persons'
  })
  assert.deepEqual(JSON.parse(res.payload), [alice, carla, dan])
})

const createPayload = (name: string, surname: string) => ({name, surname})
const updatePayload = (name: string, surname: string) => ({name, surname})
const person = (id: number, name: string, surname: string) => ({id, name, surname})
