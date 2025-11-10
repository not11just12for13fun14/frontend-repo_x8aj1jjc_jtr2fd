import React from 'react'

export default function Header() {
  return (
    <header className="w-full py-6 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-600 text-white grid place-items-center font-bold">SAS</div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Viya JES Runner</h1>
            <p className="text-sm text-gray-500">Run SAS jobs and view results</p>
          </div>
        </div>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Help</a>
      </div>
    </header>
  )
}
