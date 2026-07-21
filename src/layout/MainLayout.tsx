import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from '@/components/shared/Nav'
import styles from './MainLayout.module.scss'

const MainLayout = () => {
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    mainRef.current?.focus()
  }, [location.pathname])

  return (
    <>
      <header className={styles.header}>
        <Nav />
      </header>
      <main
        ref={mainRef}
        tabIndex={-1}
        aria-labelledby="page-title"
        className={styles.main}
      >
        <Outlet />
      </main>
      <footer className={styles.footer}>MiniBank</footer>
    </>
  )
}

export default MainLayout
