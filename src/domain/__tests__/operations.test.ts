import type { Account } from '../account.types'
import { createAccount, deposit, transfer, withdraw } from '../operations'

const eur = (amount: number): number => amount * 100

const normal = (accountNumber: string, amount: number): Account => ({
  type: 'normal',
  accountNumber,
  userName: 'Test User',
  amount,
})

const savings = (accountNumber: string, amount: number): Account => ({
  type: 'savings',
  accountNumber,
  userName: 'Test User',
  amount,
  interestRate: 1.5,
})

describe('createAccount', () => {
  it('gives a normal account the 10 EUR welcome bonus', () => {
    const accounts = createAccount([], {
      type: 'normal',
      accountNumber: '555-1',
      userName: 'Big Buck',
    })
    expect(accounts[0].amount).toBe(eur(10))
  })

  it('starts a savings account at zero with no welcome bonus', () => {
    const accounts = createAccount([], {
      type: 'savings',
      accountNumber: '666-1',
      userName: 'Big Buck',
      interestRate: 1.5,
    })
    expect(accounts[0].amount).toBe(0)
  })

  it('rejects a duplicate account number', () => {
    const accounts = createAccount([], {
      type: 'normal',
      accountNumber: '555-1',
      userName: 'Big Buck',
    })
    expect(() =>
      createAccount(accounts, {
        type: 'savings',
        accountNumber: '555-1',
        userName: 'Someone Else',
        interestRate: 2,
      }),
    ).toThrow(/already exists/i)
  })
})

describe('deposit', () => {
  it('adds the amount to the balance', () => {
    const result = deposit([normal('555-1', eur(100))], '555-1', eur(50))
    expect(result[0].amount).toBe(eur(150))
  })

  it('rejects a non-positive amount', () => {
    const accounts = [normal('555-1', eur(100))]
    expect(() => deposit(accounts, '555-1', 0)).toThrow(/greater than zero/i)
    expect(() => deposit(accounts, '555-1', eur(-10))).toThrow(
      /greater than zero/i,
    )
  })

  it('rejects an unknown account', () => {
    expect(() => deposit([], 'missing', eur(10))).toThrow(/not found/i)
  })
})

describe('withdraw', () => {
  it('allows a normal account down to exactly -500 EUR', () => {
    const result = withdraw([normal('555-1', 0)], '555-1', eur(500))
    expect(result[0].amount).toBe(eur(-500))
  })

  it('rejects a normal withdrawal that would exceed -500 EUR', () => {
    expect(() => withdraw([normal('555-1', 0)], '555-1', eur(500) + 1)).toThrow(
      /insufficient funds/i,
    )
  })

  it('lets a savings account reach exactly zero but not go negative', () => {
    const accounts = [savings('666-1', eur(50))]
    expect(withdraw(accounts, '666-1', eur(50))[0].amount).toBe(0)
    expect(() => withdraw(accounts, '666-1', eur(50) + 1)).toThrow(
      /insufficient funds/i,
    )
  })

  it('leaves balances unchanged when the withdrawal is rejected', () => {
    const accounts = [savings('666-1', eur(50))]
    expect(() => withdraw(accounts, '666-1', eur(100))).toThrow(/insufficient/i)
    expect(accounts[0].amount).toBe(eur(50))
  })
})

describe('transfer', () => {
  it('moves money from the sender to the receiver', () => {
    const accounts = [normal('555-1', eur(100)), savings('666-1', 0)]
    const result = transfer(accounts, '555-1', '666-1', eur(30))
    expect(result.find((a) => a.accountNumber === '555-1')?.amount).toBe(
      eur(70),
    )
    expect(result.find((a) => a.accountNumber === '666-1')?.amount).toBe(
      eur(30),
    )
  })

  it('rejects a transfer to the same account', () => {
    expect(() =>
      transfer([normal('555-1', eur(100))], '555-1', '555-1', eur(10)),
    ).toThrow(/same account/i)
  })

  it('enforces the overdraft rule on the sending side and does not mutate on reject', () => {
    const accounts = [savings('666-1', eur(50)), normal('555-1', 0)]
    expect(() => transfer(accounts, '666-1', '555-1', eur(250))).toThrow(
      /insufficient funds/i,
    )
    expect(accounts[0].amount).toBe(eur(50))
    expect(accounts[1].amount).toBe(0)
  })
})
