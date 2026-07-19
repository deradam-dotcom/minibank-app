export type AccountType = 'normal' | 'savings'

type BaseAccount = {
  readonly accountNumber: string
  readonly userName: string
  readonly amount: number
}

export type NormalAccount = BaseAccount & {
  readonly type: 'normal'
}

export type SavingsAccount = BaseAccount & {
  readonly type: 'savings'
  readonly interestRate: number
}

export type Account = NormalAccount | SavingsAccount
