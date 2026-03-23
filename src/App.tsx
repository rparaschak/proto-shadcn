import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import AnalyticsDemo1 from './modules/analytics-demo-1/AnalyticsDemo1'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/analytics-demo-1/*" element={<AnalyticsDemo1 />} />
          <Route path="*" element={<Navigate to="/analytics-demo-1" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
