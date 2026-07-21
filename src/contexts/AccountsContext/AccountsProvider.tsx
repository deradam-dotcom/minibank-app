import { useMemo, useState, type ReactNode } from 'react'
import * as operations from '@/domain/operations'
import type { Account, CreateAccountInput } from '@/domain/account.types'
import { AccountsContext } from './AccountsContext'

type Props = {
  children: ReactNode
}

const AccountsProvider = ({ children }: Props) => {
  const [accounts, setAccounts] = useState<Account[]>([])

  const value = useMemo(
    () => ({
      accounts,
      createAccount: (input: CreateAccountInput) =>
        setAccounts(operations.createAccount(accounts, input)),
      deposit: (accountNumber: string, amount: number) =>
        setAccounts(operations.deposit(accounts, accountNumber, amount)),
      withdraw: (accountNumber: string, amount: number) =>
        setAccounts(operations.withdraw(accounts, accountNumber, amount)),
      transfer: (from: string, to: string, amount: number) =>
        setAccounts(operations.transfer(accounts, from, to, amount)),
    }),
    [accounts],
  )

  return <AccountsContext value={value}>{children}</AccountsContext>
}

export default AccountsProvider
