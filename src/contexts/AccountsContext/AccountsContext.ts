import { createContext } from 'react'
import type { Account, CreateAccountInput } from '@/domain/account.types'

export type AccountsContextValue = {
  accounts: Account[]
  createAccount: (input: CreateAccountInput) => void
  deposit: (accountNumber: string, amount: number) => void
  withdraw: (accountNumber: string, amount: number) => void
  transfer: (from: string, to: string, amount: number) => void
}

export const AccountsContext = createContext<AccountsContextValue | null>(null)
