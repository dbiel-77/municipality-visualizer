import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'

export default function App() {
  console.log("opened successfully")
  return (
    <Router>
      <div className="flex flex-col w-screen h-screen bg-gray-900 text-white overflow-hidden">
        {/* Content area */}
        <div className="flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-screen-2xl h-full p-6">
            <Dashboard />
          </div>
        </div>
      </div>
    </Router>
  )
}
