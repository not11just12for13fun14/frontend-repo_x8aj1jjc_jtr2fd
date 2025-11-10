import React from 'react'

export default function ResultTable({ data }) {
  if (!data) return null
  const { rows, meta } = data

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Line</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Metric</th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {rows.map((r, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 text-sm text-gray-800">{r.line}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{r.metric}</td>
                <td className="px-4 py-2 text-sm text-gray-900 text-right">{r.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-gray-500">
        <span className="font-medium">Report Date:</span> {meta.report_date} • {meta.previous_date ? (<><span className="font-medium">Previous:</span> {meta.previous_date} • </>) : null}
        <span className="font-medium">LCR:</span> {meta.lcr_lines} • <span className="font-medium">Country:</span> {meta.country}
      </div>
    </div>
  )
}
