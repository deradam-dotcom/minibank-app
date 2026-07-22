import CreateAccountForm from '@/features/create-account/CreateAccountForm'
import styles from './CreateAccountPage.module.scss'

const CreateAccountPage = () => (
  <section className={styles.page}>
    <h1 id="page-title">Create Account</h1>
    <CreateAccountForm />
  </section>
)

export default CreateAccountPage
