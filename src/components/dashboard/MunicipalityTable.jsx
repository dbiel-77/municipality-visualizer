import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'

// map province codes → full names
const PROVINCES = {
  ON: 'Ontario', QC: 'Quebec', NS: 'Nova Scotia', NB: 'New Brunswick',
  MB: 'Manitoba', BC: 'British Columbia', PE: 'Prince Edward Island',
  SK: 'Saskatchewan', AB: 'Alberta',
  NL: 'Newfoundland and Labrador',
  NT: 'Northwest Territories',
  YT: 'Yukon',
  NU: 'Nunavut'
}

// how many rows to always show
const VISIBLE_ROWS = 10

export default function MunicipalityTable({ data, onRowClick }) {
  const [query, setQuery] = useState('')

  // base = only not_started
  const base = useMemo(
    () => data.filter(m => m.status === 'not_started'),
    [data]
  )

  // add full province name for fuzzy matching
  const searchList = useMemo(
    () => base.map(m => ({
      ...m,
      provinceFull: PROVINCES[m.province] || m.province
    })),
    [base]
  )

  // configure Fuse
  const fuse = useMemo(() => new Fuse(searchList, {
    keys: ['name','province','provinceFull'],
    threshold: 0.3
  }), [searchList])

  // get matching rows, always sort by population desc
  const rows = useMemo(() => {
    let results = query
      ? fuse.search(query).map(r => r.item)
      : [...base]
    return results
      .sort((a,b) => b.population - a.population)
      .slice(0, VISIBLE_ROWS)  // cap at max rows
  }, [query, fuse, base])

  // how many blanks to pad out
  const blanks = Math.max(0, VISIBLE_ROWS - rows.length)

  return (
    <div className="w-full max-w-10xl mx-auto">
      {/* search */}
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search by name or province…"
        className="w-full px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
      />

      {/* fixed-height table */}
      <div className="overflow-y-auto h-[300px] border border-gray-700 rounded mt-2">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-2 py-1 text-left">Name</th>
              <th className="px-2 py-1 text-left">Province</th>
              <th className="px-2 py-1 text-left">Population</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m,i) => (
              <tr key={m.name + i} onClick={() => onRowClick(m)} className="even:bg-gray-800 odd:bg-gray-900">
                <td className="px-2 py-1">{m.name}</td>
                <td className="px-2 py-1">{m.province}</td>
                <td className="px-2 py-1">{m.population.toLocaleString()}</td>
                <td className="px-2 py-1 capitalize">{m.status.replace('_',' ')}</td>
              </tr>
            ))}

            {/* blank filler rows */}
            {Array.from({ length: blanks }).map((_, i) => (
              <tr key={`blank-${i}`} className="even:bg-gray-800 odd:bg-gray-900">
                <td className="px-2 py-1">&nbsp;</td>
                <td className="px-2 py-1">&nbsp;</td>
                <td className="px-2 py-1">&nbsp;</td>
                <td className="px-2 py-1">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
