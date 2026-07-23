import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <section>
    <h1 id="page-title">Page not found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/accounts">Back to accounts</Link>
  </section>
)

export default NotFoundPage
