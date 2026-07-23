import { useState, type FormEvent } from 'react'
import AccountSelect from '@/components/shared/AccountSelect'
import Field from '@/components/ui/Field'
import Button from '@/components/ui/Button'
import LiveMessage from '@/components/ui/LiveMessage'
import useAccounts from '@/contexts/AccountsContext/useAccounts'
import { formatEUR, toCents } from '@/utils/money'

type Feedback = { text: string; variant: 'success' | 'error' }

const TransferForm = () => {
  const { transfer } = useAccounts()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [feedback, setFeedback] = useState<Feedback>({
    text: '',
    variant: 'success',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cents = toCents(Number(amount))
    try {
      transfer(from, to, cents)
      setFeedback({
        text: `Transferred ${formatEUR(cents)} from ${from} to ${to}.`,
        variant: 'success',
      })
      setFrom('')
      setTo('')
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
        id="from"
        label="From account"
        value={from}
        onChange={setFrom}
      />
      <AccountSelect id="to" label="To account" value={to} onChange={setTo} />
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
      <Button type="submit">Transfer</Button>
      <LiveMessage message={feedback.text} variant={feedback.variant} />
    </form>
  )
}

export default TransferForm
