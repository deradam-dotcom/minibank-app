import type { InputHTMLAttributes } from 'react'

type Props = {
  id: string
  label: string
} & InputHTMLAttributes<HTMLInputElement>

const Field = ({ id, label, ...inputProps }: Props) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} {...inputProps} />
  </div>
)

export default Field
