import { describe, it, expect } from 'vitest'

import { makeMatch } from './MongoDB.match'

describe('MongoDB.match', () => {
  it('Checks simple input', async () => {
    const input = {
      name: 'Name',
    }

    const $match = makeMatch(input)

    expect($match['name']).toBe('Name')
  })

  it('Checks simple search input', async () => {
    const input = {
      search: {
        name: 'Name',
      },
    }

    const $match = makeMatch(input)

    expect($match['search.name']).toStrictEqual(/name/i)
  })

  it('Checks search input with undefined value', async () => {
    const input = {
      search: {
        name: undefined,
      },
    }

    const $match = makeMatch(input)

    expect($match['search']).not.toBeDefined()
    expect($match['search.name']).toBe(undefined)
  })

  it('Checks simple native input with search', async () => {
    const input = {
      $and: [
        {
          search: {
            description: 'Description',
          },
        },
      ],
    }

    const $match = makeMatch(input)

    expect($match['$and']?.[0]?.['search.description']).toStrictEqual(/description/i)
  })

  it('Checks simple native input', async () => {
    const input = {
      document: {
        $eq: '05933837377',
      },
    }

    const $match = makeMatch(input)

    expect($match['document']['$eq']).toBe('05933837377')
  })

  it('Checks double native input', async () => {
    const now = new Date()

    const input = {
      createdAt: {
        $gte: now,
        $lte: now,
      },
    }

    const $match = makeMatch(input)

    expect($match['createdAt']['$gte']).toBe(now)
    expect($match['createdAt']['$lte']).toBe(now)
  })

  it('Checks deep double native input', async () => {
    const now = new Date()

    const input = {
      duration: {
        startAt: {
          $gte: now,
        },
        endAt: {
          $lte: now,
        },
      },
    }

    const $match = makeMatch(input)

    expect($match['duration.startAt']['$gte']).toBe(now)
    expect($match['duration.endAt']['$lte']).toBe(now)
  })

  it('Checks deep deep native input', async () => {
    const now = new Date()

    const input = {
      customer: {
        summary: {
          lastOrder: {
            duration: {
              startAt: {
                $gte: now,
              },
              endAt: {
                $lte: now,
              },
            },
          },
        },
      },
    }

    const $match = makeMatch(input)

    expect($match['customer.summary.lastOrder.duration.startAt']['$gte']).toBe(now)
    expect($match['customer.summary.lastOrder.duration.endAt']['$lte']).toBe(now)
  })

  it('Checks simple native input with deep native', async () => {
    const now = new Date()

    const input = {
      $and: [
        {
          customer: {
            userLoyalty: {
              duration: {
                startAt: {
                  $gte: now,
                },
              },
            },
          },
        },
      ],
    }

    const $match = makeMatch(input)

    expect($match['$and']?.[0]?.['customer.userLoyalty.duration.startAt']['$gte']).toBe(now)
  })

  it('Checks input with deep simple', async () => {
    const input = {
      payment: {
        type: 'ONLINE',
      },
    }

    const $match = makeMatch(input)

    expect($match['payment.type']).toBe('ONLINE')
  })

  it('Checks native input with deep simple', async () => {
    const input = {
      $or: [
        {
          payment: {
            type: 'ONLINE',
          },
        },
      ],
    }

    const $match = makeMatch(input)

    expect($match.$or?.[0]?.['payment.type']).toBe('ONLINE')
  })

  it('Checks native input with deep simple native', async () => {
    const input = {
      $or: [
        {
          payment: {
            type: {
              $eq: 'ONLINE',
            },
          },
        },
      ],
    }

    const $match = makeMatch(input)

    expect($match.$or?.[0]?.['payment.type']['$eq']).toBe('ONLINE')
  })

  it('Checks native input $in', async () => {
    const input = {
      status: {
        $in: ['PLACED'],
      },
    }

    const $match = makeMatch(input)

    expect($match['status']['$in']).toStrictEqual(['PLACED'])
  })

  it('Checks native input $nin', async () => {
    const input = {
      status: {
        $nin: ['PLACED'],
      },
    }

    const $match = makeMatch(input)

    expect($match['status']['$nin']).toStrictEqual(['PLACED'])
  })

  it('Checks native input $in with deep input', async () => {
    const input = {
      order: {
        status: {
          $nin: ['PLACED'],
        },
      },
    }

    const $match = makeMatch(input)

    expect($match['order.status']['$nin']).toStrictEqual(['PLACED'])
  })

  it('Checks native input $in with deep deep input', async () => {
    const input = {
      order: {
        customer: {
          role: {
            $nin: ['MANAGER'],
          },
        },
      },
    }

    const $match = makeMatch(input)

    expect($match['order.customer.role']['$nin']).toStrictEqual(['MANAGER'])
  })

  it('Checks native input $in with deep deep input undefined', async () => {
    const input = {
      order: {
        customer: {
          role: {
            $nin: undefined,
          },
        },
      },
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(0)
  })

  it('Checks input with simple undefined', async () => {
    const input = {
      name: undefined,
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(0)
  })

  it('Checks input with deep simple undefined', async () => {
    const input = {
      payment: {
        type: undefined,
        method: 'PIX',
      },
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(1)
  })

  it('Checks input with deep native undefined', async () => {
    const input = {
      payment: {
        type: {
          $eq: undefined,
        },
      },
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(0)
  })

  it('Checks input with simple native undefined', async () => {
    const input = {
      paidAt: {
        $gte: new Date(),
        $lte: undefined,
      },
    }

    const $match = makeMatch(input)

    expect(Object.keys($match['paidAt']).length).toBe(1)
  })

  it('Checks input with deep double native undefined', async () => {
    const input = {
      payment: {
        type: {
          $eq: 'ONLINE',
        },
        method: {
          $eq: undefined,
        },
      },
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(1)
  })

  it('Checks input with deep double native single undefined', async () => {
    const input = {
      payment: {
        type: {
          $eq: 'ONLINE',
        },
        method: {
          $eq: undefined,
        },
      },
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(1)
  })

  it('Checks input with deep double native double undefined', async () => {
    const input = {
      payment: {
        type: {
          $eq: undefined,
        },
        method: {
          $eq: undefined,
        },
      },
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(0)
  })

  it('Checks input with deep simple double', async () => {
    const input = {
      payment: {
        type: 'ONLINE',
        method: 'PIX',
      },
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(2)
    expect($match['payment.type']).toBe('ONLINE')
    expect($match['payment.method']).toBe('PIX')
  })

  it('Checks input with deep simple with native', async () => {
    const input = {
      payment: {
        type: {
          $eq: 'ONLINE',
        },
      },
    }

    const $match = makeMatch(input)

    expect(Object.keys($match).length).toBe(1)
    expect($match['payment.type']['$eq']).toBe('ONLINE')
  })

  it('Checks input with deep native empty array', async () => {
    const input = {
      payment: {
        type: {
          $in: [],
        },
      },
    }

    const $match = makeMatch(input)

    expect($match['payment.type']['$in']).toStrictEqual([])
  })

  it('Checks input with deep native array fulfilled', async () => {
    const input = {
      payment: {
        type: {
          $in: ['1', '2', '3'],
        },
      },
    }

    const $match = makeMatch(input)

    expect($match['payment.type']['$in']).toStrictEqual(['1', '2', '3'])
  })
})
