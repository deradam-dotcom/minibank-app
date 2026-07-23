import useAccounts from '@/contexts/AccountsContext/useAccounts'

type Props = {
  id: string
  label: string
  value: string
  onChange: (accountNumber: string) => void
}

const AccountSelect = ({ id, label, value, onChange }: Props) => {
  const { accounts } = useAccounts()

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
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
