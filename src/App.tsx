import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import WelcomePage from './components/WelcomePage'
import AnalyticsDemo1 from './modules/analytics-demo-1/AnalyticsDemo1'
import AiSupportChat from './modules/ai-support-chat/AiSupportChat'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/analytics-demo-1/*" element={<AnalyticsDemo1 />} />
          <Route path="/ai-support-chat/*" element={<AiSupportChat />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
