import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.scss'

const NotFoundPage = () => (
  <section className={styles.notFound}>
    <h1 id="page-title">Page not found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/accounts">Back to accounts</Link>
  </section>
)

export default NotFoundPage
