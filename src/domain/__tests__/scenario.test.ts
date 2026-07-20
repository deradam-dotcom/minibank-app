import type { Account } from '../account.types'
import { createAccount, deposit, transfer } from '../operations'

const eur = (amount: number): number => amount * 100

const balanceOf = (accounts: Account[], accountNumber: string): number => {
  const account = accounts.find((a) => a.accountNumber === accountNumber)
  if (!account)
    throw new Error(`Account ${accountNumber} not found in scenario`)
  return account.amount
}

describe('BRIEF use-case scenario', () => {
  it('processes the eight use cases and enforces the savings rule on step 8', () => {
    let accounts: Account[] = []

    accounts = createAccount(accounts, {
      type: 'normal',
      accountNumber: '555-1111111-58',
      userName: 'Mr. Big Buck',
    })

    accounts = deposit(accounts, '555-1111111-58', eur(500))

    accounts = createAccount(accounts, {
      type: 'savings',
      accountNumber: '666-2222222-31',
      userName: 'Mr. Big Buck',
      interestRate: 1.5,
    })

    accounts = transfer(accounts, '555-1111111-58', '666-2222222-31', eur(250))

    accounts = createAccount(accounts, {
      type: 'normal',
      accountNumber: '555-3333333-10',
      userName: 'Ms. Small Pocket',
    })

    accounts = createAccount(accounts, {
      type: 'savings',
      accountNumber: '666-4444444-80',
      userName: 'Ms. Small Pocket',
      interestRate: 1.5,
    })

    accounts = transfer(accounts, '555-3333333-10', '666-4444444-80', eur(50))

    expect(() =>
      transfer(accounts, '666-4444444-80', '555-3333333-10', eur(250)),
    ).toThrow(/insufficient funds/i)

    expect(balanceOf(accounts, '555-1111111-58')).toBe(eur(260))
    expect(balanceOf(accounts, '666-2222222-31')).toBe(eur(250))
    expect(balanceOf(accounts, '555-3333333-10')).toBe(eur(-40))
    expect(balanceOf(accounts, '666-4444444-80')).toBe(eur(50))
  })
})
