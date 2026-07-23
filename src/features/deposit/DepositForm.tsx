import { useState, type FormEvent } from 'react'
import AccountSelect from '@/components/shared/AccountSelect'
import Field from '@/components/ui/Field'
import Button from '@/components/ui/Button'
import LiveMessage from '@/components/ui/LiveMessage'
import useAccounts from '@/contexts/AccountsContext/useAccounts'
import { formatEUR, toCents } from '@/utils/money'

type Feedback = { text: string; variant: 'success' | 'error' }

const DepositForm = () => {
  const { deposit } = useAccounts()
  const [accountNumber, setAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [feedback, setFeedback] = useState<Feedback>({
    text: '',
    variant: 'success',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cents = toCents(Number(amount))
    try {
      deposit(accountNumber, cents)
      setFeedback({
        text: `Deposited ${formatEUR(cents)} into ${accountNumber}.`,
        variant: 'success',
      })
      setAccountNumber('')
      setAmount('')
    } catch (error) {
      const text =
        error instanceof Error ? error.message : 'Something went wrong.'
      setFeedback({ text, variant: 'error' })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <AccountSelect
        id="account"
        label="Account"
        value={accountNumber}
        onChange={setAccountNumber}
      />
      <Field
        id="amount"
        label="Amount (EUR)"
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        required
      />
      <Button type="submit">Deposit</Button>
      <LiveMessage message={feedback.text} variant={feedback.variant} />
    </form>
  )
}

export default DepositForm
