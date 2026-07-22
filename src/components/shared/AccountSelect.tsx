import useAccounts from '@/contexts/AccountsContext/useAccounts'
import styles from './AccountSelect.module.scss'

type Props = {
  id: string
  label: string
  value: string
  onChange: (accountNumber: string) => void
}

const AccountSelect = ({ id, label, value, onChange }: Props) => {
  const { accounts } = useAccounts()

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        id={id}
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select an account</option>
        {accounts.map((account) => (
          <option key={account.accountNumber} value={account.accountNumber}>
            {account.accountNumber} — {account.userName}
          </option>
        ))}
      </select>
    </div>
  )
}

export default AccountSelect
