import AccountList from '@/features/account-list/AccountList'
import styles from './AccountsPage.module.scss'

const AccountsPage = () => (
  <section className={styles.page}>
    <h1 id="page-title">Accounts</h1>
    <AccountList />
  </section>
)

export default AccountsPage
