import { Link } from 'react-router-dom'
import useAccounts from '@/contexts/AccountsContext/useAccounts'
import { formatEUR } from '@/utils/money'
import styles from './AccountList.module.scss'

const AccountList = () => {
  const { accounts } = useAccounts()

  if (accounts.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No accounts yet. Create your first account.</p>
        <Link to="/create">Create Account</Link>
      </div>
    )
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Account number</th>
            <th scope="col">User name</th>
            <th scope="col">Type</th>
            <th scope="col">Balance</th>
            <th scope="col">Interest rate</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.accountNumber}>
              <td>{account.accountNumber}</td>
              <td>{account.userName}</td>
              <td className={styles.type}>{account.type}</td>
              <td>{formatEUR(account.amount)}</td>
              <td>
                {account.type === 'savings' ? `${account.interestRate}%` : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AccountList
