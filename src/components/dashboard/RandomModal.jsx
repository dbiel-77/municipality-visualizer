import React from 'react'

export default function RandomModal({ municipality, onClose, onConfirm }) {
  if (!municipality) return null

  const { name, province, population, status, DGUID } = municipality
  const statcanURL = `https://www12.statcan.gc.ca/census-recensement/2021/as-sa/fogs-spg/page.cfm?topic=1&lang=E&dguid=${DGUID}#`

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded shadow max-w-md w-full space-y-4">
        <h2 className="text-xl font-bold">Municipality Details</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Province:</strong> {province}</p>
        <p><strong>Population:</strong> {population.toLocaleString()}</p>
        <p><strong>Status:</strong> {status.replace('_', ' ')}</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-2 rounded font-semibold"
          >
            Close
          </button>

          <button
            href={statcanURL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-2 rounded font-semibold"
          >
            View Municipality
          </button>
        </div>
      </div>
    </div>
  )
}
