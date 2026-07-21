import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import NotFoundPage from '@/pages/NotFoundPage'

const App = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<Navigate to="/accounts" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)

export default App
