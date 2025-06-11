import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import municipalities from '../data/municipalities.json'
import MetricCard from './dashboard/MetricCard'
import ProgressRing from './dashboard/ProgressRing'
import PopulationProgressBar from './dashboard/PopulationProgressBar'
import MunicipalityTable from './dashboard/MunicipalityTable'
import RandomModal from './dashboard/RandomModal'

export default function Dashboard() {
  const navigate = useNavigate()
  const [selectedMunicipality, setSelectedMunicipality] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const total = municipalities.length
  const complete = municipalities.filter(m => m.status === 'complete').length
  const inProgress = municipalities.filter(m => m.status === 'in_progress').length
  const notStarted = total - complete - inProgress
  const percent = (complete / total) * 100

  // Open modal with given municipality
  const openModal = (m) => {
    console.log('openModal called with:', m)
    setSelectedMunicipality(m)
    setModalVisible(true)
    setSelectedMunicipality(m)
    setModalVisible(true)
  }

  // Close modal and clear selection
  const closeModal = () => {
    setModalVisible(false)
    setSelectedMunicipality(null)
  }

  // Navigate to form page for selected municipality
  const startForm = () => {
    if (selectedMunicipality) {
      console.log(navigate(`/form/${selectedMunicipality.DGUID}`))
    }
  }

  // Pick a random municipality and open modal
  const getRandomMunicipality = () => {
    // pick a random eligible municipality and show modal
    const eligible = municipalities.filter(m => m.status !== 'complete')
    if (eligible.length === 0) return
    const pick = eligible[Math.floor(Math.random() * eligible.length)]
    openModal(pick)
  }

  return (
    <div className="w-full h-full max-w-screen-2xl p-4 space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center">Municipality Data Tracker</h1>

      {/* Population & Ring */}
      <div className="w-full flex justify-center space-x-8">
        <PopulationProgressBar data={municipalities} />
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Total" value={total} color="bg-gray-800" />
        <MetricCard label="Complete" value={complete} color="bg-green-700" />
        <MetricCard label="In Progress" value={inProgress} color="bg-yellow-600" />
        <MetricCard label="Not Started" value={notStarted} color="bg-red-600" />
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Municipalities To Work On</h2>
        <button
          onClick={getRandomMunicipality}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
        >
          Choose a Random Municipality
        </button>
      </div>

      {/* Table with modal on row click */}
      <MunicipalityTable
        data={municipalities}
        onRowClick={openModal}
      />

      {/* Modal for details + start form */}
      {modalVisible && (
        <RandomModal
          municipality={selectedMunicipality}
          onClose={closeModal}
          onConfirm={startForm}
        />
      )}
    </div>
  )
}