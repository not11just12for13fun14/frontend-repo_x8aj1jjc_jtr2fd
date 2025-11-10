import React, { useState } from 'react'
import Header from './components/Header'
import JobForm from './components/JobForm'
import ResultTable from './components/ResultTable'
import InfoPanel from './components/InfoPanel'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  const runJob = async (values) => {
    setLoading(true)
    setError('')
    setData(null)
    try {
      const res = await fetch(`${BACKEND_URL}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Request failed')
      }
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <InfoPanel />

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <JobForm onRun={runJob} loading={loading} />
          {error && <div className="mt-4 rounded-md bg-red-50 text-red-700 p-3 text-sm">{error}</div>}
        </div>

        {data && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Result Dataset</h2>
            <ResultTable data={data} />
          </div>
        )}
      </main>
    </div>
  )
}
