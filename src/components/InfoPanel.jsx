import React from 'react'

export default function InfoPanel() {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50 text-blue-900 p-4">
      <h3 className="text-sm font-semibold mb-1">About this tool</h3>
      <p className="text-sm leading-relaxed">
        Enter your SAS job parameters, submit, and view the resulting dataset as a table.
        This sandbox simulates a SAS Viya JES run and returns a shaped dataset for quick iteration.
      </p>
    </div>
  )
}
