import React, { useState } from 'react'

const defaults = {
  report_date: '31AUG2019',
  previous_date: '31JUL2019',
  lcr_lines: '6,17',
  country: 'SG',
}

export default function JobForm({ onRun, loading }) {
  const [values, setValues] = useState(defaults)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const validate = () => {
    const errs = {}
    if (!values.report_date) errs.report_date = 'Required'
    if (!values.lcr_lines) errs.lcr_lines = 'Required'
    if (!values.country) errs.country = 'Required'
    // simple client checks
    const dateRe = /^\d{2}[A-Z]{3}\d{4}$/
    if (values.report_date && !dateRe.test(values.report_date)) errs.report_date = 'Use DDMMMYYYY'
    if (values.previous_date && !dateRe.test(values.previous_date)) errs.previous_date = 'Use DDMMMYYYY'
    const lcrRe = /^\s*\d+(\s*,\s*\d+)*\s*$/
    if (values.lcr_lines && !lcrRe.test(values.lcr_lines)) errs.lcr_lines = 'Comma-separated integers'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onRun(values)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Report Date</label>
          <input name="report_date" value={values.report_date} onChange={handleChange} placeholder="31AUG2019" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          {errors.report_date && <p className="mt-1 text-sm text-red-600">{errors.report_date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Previous Date (optional)</label>
          <input name="previous_date" value={values.previous_date} onChange={handleChange} placeholder="31JUL2019" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          {errors.previous_date && <p className="mt-1 text-sm text-red-600">{errors.previous_date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">LCR Lines</label>
          <input name="lcr_lines" value={values.lcr_lines} onChange={handleChange} placeholder="6,17" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          {errors.lcr_lines && <p className="mt-1 text-sm text-red-600">{errors.lcr_lines}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input name="country" value={values.country} onChange={handleChange} placeholder="SG" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 uppercase" />
          {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading} className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Running…' : 'Run SAS Job'}
        </button>
        <button type="button" onClick={() => { setValues(defaults); setErrors({}) }} className="text-sm text-gray-600 hover:text-gray-800">Reset to defaults</button>
      </div>
    </form>
  )
}
