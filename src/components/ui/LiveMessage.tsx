import styles from './LiveMessage.module.scss'

type Props = {
  message: string
  variant?: 'success' | 'error'
}

const LiveMessage = ({ message, variant = 'success' }: Props) => (
  <p
    role={variant === 'error' ? 'alert' : 'status'}
    className={message ? styles[variant] : undefined}
  >
    {message}
  </p>
)

export default LiveMessage
