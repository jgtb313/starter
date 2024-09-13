import { describe, it, expect } from 'vitest'

import { deepPick } from './deepPick'

describe('deepPick', () => {
  const sampleData = {
    user: {
      name: 'John Doe',
      age: 30,
      address: {
        city: 'New York',
        state: 'NY'
      }
    },
    orders: [
      { id: 1, product: 'Apple', quantity: 2 },
      { id: 2, product: 'Banana', quantity: 5 }
    ],
    meta: {
      createdAt: '2024-01-01',
      updatedAt: '2024-01-02'
    },
    tags: ['important', 'urgent', 'high-priority'],
    nestedObject: {
      level0: {
        value: 'nested value'
      },
      level1: {
        level2: {
          level3: {
            value: 'deep nested value'
          }
        }
      }
    }
  }

  it.each([{ keys: 'user' }, { keys: ['user'] }])('picks specified top-level fields', ({ keys }) => {
    const result = deepPick(keys, sampleData)

    expect(result).toEqual({
      user: {
        name: 'John Doe',
        age: 30,
        address: {
          city: 'New York',
          state: 'NY'
        }
      }
    })
  })

  it.each([
    {
      description: 'picks name and age from user',
      keys: ['user.name', 'user.age'],
      expected: {
        user: {
          name: 'John Doe',
          age: 30
        }
      }
    },
    {
      description: 'picks product from orders array',
      keys: 'orders[].product',
      expected: { orders: [{ product: 'Apple' }, { product: 'Banana' }] }
    },
    {
      description: 'picks user name and product from orders',
      keys: 'user.name,orders[].product',
      expected: {
        user: { name: 'John Doe' },
        orders: [{ product: 'Apple' }, { product: 'Banana' }]
      }
    },
    {
      description: 'picks address city and user age',
      keys: 'user.address.city,user.age',
      expected: {
        user: { address: { city: 'New York' }, age: 30 }
      }
    },
    {
      description: 'picks orders id and quantity',
      keys: 'orders[].id,orders[].quantity',
      expected: {
        orders: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 5 }
        ]
      }
    },
    {
      description: 'picks meta createdAt',
      keys: 'meta.createdAt',
      expected: {
        meta: { createdAt: '2024-01-01' }
      }
    },
    {
      description: 'picks tags completely',
      keys: ['tags'],
      expected: {
        tags: ['important', 'urgent', 'high-priority']
      }
    },
    {
      description: 'picks nested object',
      keys: ['nestedObject.level1.level2'],
      expected: {
        nestedObject: {
          level1: {
            level2: {
              level3: {
                value: 'deep nested value'
              }
            }
          }
        }
      }
    }
  ])('$description correctly', ({ keys, expected }) => {
    const result = deepPick(keys, sampleData)

    expect(result).toStrictEqual(expected)
  })

  it.each([
    { keys: 'user.nonexistent', expected: { user: {} } },
    { keys: 'nonexistent', expected: {} }
  ])('handles non-existent fields gracefully', ({ keys, expected }) => {
    const result = deepPick(keys, sampleData)

    expect(result).toEqual(expected)
  })

  it('returns the entire object if no fields are specified', () => {
    const result = deepPick('', sampleData)

    expect(result).toEqual(sampleData)
  })
})
