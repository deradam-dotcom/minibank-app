import { useState, type FormEvent } from 'react'
import Field from '@/components/ui/Field'
import Button from '@/components/ui/Button'
import LiveMessage from '@/components/ui/LiveMessage'
import useAccounts from '@/contexts/AccountsContext/useAccounts'
import type { AccountType } from '@/domain/account.types'
import styles from './CreateAccountForm.module.scss'

type Feedback = { text: string; variant: 'success' | 'error' }

const CreateAccountForm = () => {
  const { createAccount } = useAccounts()
  const [accountNumber, setAccountNumber] = useState('')
  const [userName, setUserName] = useState('')
  const [type, setType] = useState<AccountType>('normal')
  const [interestRate, setInterestRate] = useState('')
  const [feedback, setFeedback] = useState<Feedback>({
    text: '',
    variant: 'success',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (type === 'normal') {
        createAccount({ accountNumber, userName, type: 'normal' })
      } else {
        createAccount({
          accountNumber,
          userName,
          type: 'savings',
          interestRate: Number(interestRate),
        })
      }
      setFeedback({
        text: `Account ${accountNumber} created.`,
        variant: 'success',
      })
      setAccountNumber('')
      setUserName('')
      setType('normal')
      setInterestRate('')
    } catch (error) {
      const text =
        error instanceof Error ? error.message : 'Something went wrong.'
      setFeedback({ text, variant: 'error' })
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        id="accountNumber"
        label="Account number"
        value={accountNumber}
        onChange={(event) => setAccountNumber(event.target.value)}
        required
      />
      <Field
        id="userName"
        label="User name"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        required
      />
      <div className={styles.field}>
        <label htmlFor="type" className={styles.label}>
          Type
        </label>
        <select
          id="type"
          className={styles.select}
          value={type}
          onChange={(event) => setType(event.target.value as AccountType)}
        >
          <option value="normal">Normal</option>
          <option value="savings">Savings</option>
        </select>
      </div>
      {type === 'savings' && (
        <Field
          id="interestRate"
          label="Interest rate (%)"
          type="number"
          min="0"
          step="0.1"
          value={interestRate}
          onChange={(event) => setInterestRate(event.target.value)}
          required
        />
      )}
      <Button type="submit">Create account</Button>
      <LiveMessage message={feedback.text} variant={feedback.variant} />
    </form>
  )
}

export default CreateAccountForm
