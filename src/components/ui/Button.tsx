import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ type = 'button', children, ...rest }: Props) => (
  <button type={type} className={styles.button} {...rest}>
    {children}
  </button>
)

export default Button
