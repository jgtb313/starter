import { describe, test, expect } from 'vitest'

import { makeMatch } from './MongoDB.match'

describe('MongoDB.match', () => {
  test('Checa match passando context com auth', async () => {
    const input = {
      name: 'Name'
    }

    const $match = makeMatch(input, { shouldCheckRecaptcha: false, auth: { userId: '1' } })

    expect($match['name']).toBe('Name')
  })

  test('Checa match passando context sem auth', async () => {
    const input = {
      name: 'Name'
    }

    const $match = makeMatch(input, { shouldCheckRecaptcha: false })

    expect($match['name']).toBe('Name')
    expect($match['storeId']).toBe(undefined)
  })

  test('Checa input simples', async () => {
    const input = {
      name: 'Name'
    }

    const $match = makeMatch(input)

    expect($match['name']).toBe('Name')
  })

  test('Checa input search simples', async () => {
    const input = {
      search: {
        name: 'Name'
      }
    }

    const $match = makeMatch(input)

    expect($match['search.name']).toStrictEqual(/name/i)
  })

  test('Checa input search com value undefined', async () => {
    const input = {
      search: {
        name: undefined
      }
    }

    const $match = makeMatch(input)

    expect($match['search']).not.toBeDefined()
    expect($match['search.name']).toBe(undefined)
  })

  test('Checa input native simples com search', async () => {
    const input = {
      $and: [
        {
          search: {
            description: 'Description'
          }
        }
      ]
    }

    const $match = makeMatch(input)

    expect($match['$and']?.[0]?.['search.description']).toStrictEqual(/description/i)
  })

  test('Checa input native simples', async () => {
    const input = {
      document: {
        $eq: '05933837377'
      }
    }

    const $match = makeMatch(input)

    expect($match['document']['$eq']).toBe('05933837377')
  })

  test('Checa input native double', async () => {
    const now = new Date()

    const input = {
      createdAt: {
        $gte: now,
        $lte: now
      }
    }

    const $match = makeMatch(input)

    expect($match['createdAt']['$gte']).toBe(now)
    expect($match['createdAt']['$lte']).toBe(now)
  })

  test('Checa input deep native double', async () => {
    const now = new Date()

    const input = {
      duration: {
        startAt: {
          $gte: now
        },
        endAt: {
          $lte: now
        }
      }
    }

    const $match = makeMatch(input)

    expect($match['duration.startAt']['$gte']).toBe(now)
    expect($match['duration.endAt']['$lte']).toBe(now)
  })

  test('Checa input deep deep native', async () => {
    const now = new Date()

    const input = {
      customer: {
        summary: {
          lastOrder: {
            duration: {
              startAt: {
                $gte: now
              },
              endAt: {
                $lte: now
              }
            }
          }
        }
      }
    }

    const $match = makeMatch(input)

    expect($match['customer.summary.lastOrder.duration.startAt']['$gte']).toBe(now)
    expect($match['customer.summary.lastOrder.duration.endAt']['$lte']).toBe(now)
  })

  test('Checa input native simples com deep native', async () => {
    const now = new Date()

    const input = {
      $and: [
        {
          customer: {
            userLoyalty: {
              duration: {
                startAt: {
                  $gte: now
                }
              }
            }
          }
        }
      ]
    }

    const $match = makeMatch(input)

    expect($match['$and']?.[0]?.['customer.userLoyalty.duration.startAt']['$gte']).toBe(now)
  })

  test('Checa input com deep simple', async () => {
    const input = {
      payment: {
        type: 'ONLINE'
      }
    }

    const $match = makeMatch(input)

    expect($match['payment.type']).toBe('ONLINE')
  })

  test('Checa input native com deep simple', async () => {
    const input = {
      $or: [
        {
          payment: {
            type: 'ONLINE'
          }
        }
      ]
    }

    const $match = makeMatch(input)

    expect($match.$or?.[0]?.['payment.type']).toBe('ONLINE')
  })

  test('Checa input native com deep simple native', async () => {
    const input = {
      $or: [
        {
          payment: {
            type: {
              $eq: 'ONLINE'
            }
          }
        }
      ]
    }

    const $match = makeMatch(input)

    expect($match.$or?.[0]?.['payment.type']['$eq']).toBe('ONLINE')
  })

  test('Checa input native $in', async () => {
    const input = {
      status: {
        $in: ['PLACED']
      }
    }

    const $match = makeMatch(input)

    expect($match['status']['$in']).toStrictEqual(['PLACED'])
  })

  test('Checa input native $nin', async () => {
    const input = {
      status: {
        $nin: ['PLACED']
      }
    }

    const $match = makeMatch(input)

    expect($match['status']['$nin']).toStrictEqual(['PLACED'])
  })

  test('Checa input native $in com deep input', async () => {
    const input = {
      order: {
        status: {
          $nin: ['PLACED']
        }
      }
    }

    const $match = makeMatch(input)

    expect($match['order.status']['$nin']).toStrictEqual(['PLACED'])
  })

  test('Checa input native $in com deep deep input', async () => {
    const input = {
      order: {
        customer: {
          role: {
            $nin: ['MANAGER']
          }
        }
      }
    }

    const $match = makeMatch(input)

    expect($match['order.customer.role']['$nin']).toStrictEqual(['MANAGER'])
  })

  test('Checa input native $in com deep deep input undefined', async () => {
    const input = {
      order: {
        customer: {
          role: {
            $nin: undefined
          }
        }
      }
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(0)
  })

  test('Checa input com simple undefined', async () => {
    const input = {
      name: undefined
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(0)
  })

  test('Checa input com deep simple undefined', async () => {
    const input = {
      payment: {
        type: undefined,
        method: 'PIX'
      }
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(1)
  })

  test('Checa input com deep native undefined', async () => {
    const input = {
      payment: {
        type: {
          $eq: undefined
        }
      }
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(0)
  })

  test('Checa input com simple native undefined', async () => {
    const input = {
      paidAt: {
        $gte: new Date(),
        $lte: undefined
      }
    }

    const $match = makeMatch(input)

    expect(Object.keys($match['paidAt']).length).toBe(1)
  })

  test('Checa input com deep double native undefined', async () => {
    const input = {
      payment: {
        type: {
          $eq: 'ONLINE'
        },
        method: {
          $eq: undefined
        }
      }
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(1)
  })

  test('Checa input com deep double native single undefined', async () => {
    const input = {
      payment: {
        type: {
          $eq: 'ONLINE'
        },
        method: {
          $eq: undefined
        }
      }
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(1)
  })

  test('Checa input com deep double native double undefined', async () => {
    const input = {
      payment: {
        type: {
          $eq: undefined
        },
        method: {
          $eq: undefined
        }
      }
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(0)
  })

  test('Checa input com deep simple double', async () => {
    const input = {
      payment: {
        type: 'ONLINE',
        method: 'PIX'
      }
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(2)
    expect($match['payment.type']).toBe('ONLINE')
    expect($match['payment.method']).toBe('PIX')
  })

  test('Checa input com deep simple com native', async () => {
    const input = {
      payment: {
        type: {
          $eq: 'ONLINE'
        }
      }
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(1)
    expect($match['payment.type']['$eq']).toBe('ONLINE')
  })

  test('Checa input com deep native empty array', async () => {
    const input = {
      payment: {
        type: {
          $in: []
        }
      }
    }

    const $match = makeMatch(input)

    expect($match['payment.type']['$in']).toStrictEqual([])
  })

  test('Checa input com deep native array fullfiled', async () => {
    const input = {
      payment: {
        type: {
          $in: ['1', '2', '3']
        }
      }
    }

    const $match = makeMatch(input)

    expect($match['payment.type']['$in']).toStrictEqual(['1', '2', '3'])
  })
})
