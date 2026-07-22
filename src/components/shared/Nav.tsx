import { NavLink } from 'react-router-dom'
import styles from './Nav.module.scss'

const links = [
  { to: '/accounts', label: 'Accounts' },
  { to: '/create', label: 'Create Account' },
  { to: '/deposit', label: 'Deposit' },
  { to: '/withdraw', label: 'Withdraw' },
  { to: '/transfer', label: 'Transfer' },
]

const Nav = () => (
  <nav className={styles.nav} aria-label="Main">
    {links.map(({ to, label }) => (
      <NavLink key={to} to={to} className={styles.link}>
        {label}
      </NavLink>
    ))}
  </nav>
)

export default Nav
