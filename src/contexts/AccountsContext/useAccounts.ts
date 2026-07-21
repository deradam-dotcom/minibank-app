import { useContext } from 'react'
import { AccountsContext } from './AccountsContext'

const useAccounts = () => {
  const context = useContext(AccountsContext)
  if (!context) {
    throw new Error('useAccounts must be used within an AccountsProvider.')
  }
  return context
}

export default useAccounts
