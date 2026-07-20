import { canDebit, WELCOME_BONUS_NORMAL } from './account.rules'
import type { Account, CreateAccountInput } from './account.types'

const findAccount = (accounts: Account[], accountNumber: string): Account => {
  const account = accounts.find((a) => a.accountNumber === accountNumber)
  if (!account) throw new Error(`Account ${accountNumber} was not found.`)
  return account
}

const replaceAccount = (accounts: Account[], updated: Account): Account[] =>
  accounts.map((a) => (a.accountNumber === updated.accountNumber ? updated : a))

const requirePositive = (amount: number): void => {
  if (amount <= 0) throw new Error('Amount must be greater than zero.')
}

export const createAccount = (
  accounts: Account[],
  input: CreateAccountInput,
): Account[] => {
  if (accounts.some((a) => a.accountNumber === input.accountNumber)) {
    throw new Error(`Account ${input.accountNumber} already exists.`)
  }

  const account: Account =
    input.type === 'normal'
      ? { ...input, amount: WELCOME_BONUS_NORMAL }
      : { ...input, amount: 0 }

  return [...accounts, account]
}

export const deposit = (
  accounts: Account[],
  accountNumber: string,
  amount: number,
): Account[] => {
  requirePositive(amount)
  const account = findAccount(accounts, accountNumber)
  return replaceAccount(accounts, {
    ...account,
    amount: account.amount + amount,
  })
}

export const withdraw = (
  accounts: Account[],
  accountNumber: string,
  amount: number,
): Account[] => {
  requirePositive(amount)
  const account = findAccount(accounts, accountNumber)
  if (!canDebit(account, amount)) {
    throw new Error('Insufficient funds for this operation.')
  }
  return replaceAccount(accounts, {
    ...account,
    amount: account.amount - amount,
  })
}

export const transfer = (
  accounts: Account[],
  from: string,
  to: string,
  amount: number,
): Account[] => {
  if (from === to) throw new Error('Cannot transfer to the same account.')
  return deposit(withdraw(accounts, from, amount), to, amount)
}
