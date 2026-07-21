import type { InputHTMLAttributes } from 'react'
import styles from './Field.module.scss'

type Props = {
  id: string
  label: string
} & InputHTMLAttributes<HTMLInputElement>

const Field = ({ id, label, ...inputProps }: Props) => (
  <div className={styles.field}>
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
    <input id={id} className={styles.input} {...inputProps} />
  </div>
)

export default Field
