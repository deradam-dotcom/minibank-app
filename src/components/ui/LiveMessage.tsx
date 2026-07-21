import styles from './LiveMessage.module.scss'

type Props = {
  message: string
  variant?: 'success' | 'error'
}

const LiveMessage = ({ message, variant = 'success' }: Props) => {
  if (!message) return null

  return (
    <p
      role={variant === 'error' ? 'alert' : 'status'}
      className={variant === 'error' ? styles.error : styles.success}
    >
      {message}
    </p>
  )
}

export default LiveMessage
