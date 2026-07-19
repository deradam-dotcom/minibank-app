import type { Account, AccountType } from './account.types'

const CENTS_PER_EUR = 100

export const OVERDRAFT_LIMIT: Record<AccountType, number> = {
  normal: -500 * CENTS_PER_EUR,
  savings: 0,
}

export const WELCOME_BONUS_NORMAL = 10 * CENTS_PER_EUR

export const canDebit = (account: Account, amount: number): boolean =>
  account.amount - amount >= OVERDRAFT_LIMIT[account.type]
