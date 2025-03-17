import React, { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-primary text-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">MediMind</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-secondary text-white' : 'text-gray-200 hover:text-white'}`}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('patients')}
                  className={`px-3 py-2 rounded-md ${activeTab === 'patients' ? 'bg-secondary text-white' : 'text-gray-200 hover:text-white'}`}
                >
                  Patients
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('abg')}
                  className={`px-3 py-2 rounded-md ${activeTab === 'abg' ? 'bg-secondary text-white' : 'text-gray-200 hover:text-white'}`}
                >
                  ABG Analysis
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('records')}
                  className={`px-3 py-2 rounded-md ${activeTab === 'records' ? 'bg-secondary text-white' : 'text-gray-200 hover:text-white'}`}
                >
                  Medical Records
                </button>
              </li>
            </ul>
          </nav>
          <div className="md:hidden">
            <button className="text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to MediMind</h2>
          <p className="text-gray-600">
            Your comprehensive medical management system designed to help healthcare professionals
            manage patient data, medical records, and clinical workflows efficiently.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-primary/10 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Patient Management</h3>
            </div>
            <p className="text-gray-600">
              Efficiently manage patient information, demographics, and healthcare history in one place.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-secondary/10 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Medical Records</h3>
            </div>
            <p className="text-gray-600">
              Securely store and access patient medical records, test results, and treatment plans.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-accent hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-accent/10 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">ABG Analysis</h3>
            </div>
            <p className="text-gray-600">
              Advanced Arterial Blood Gas analysis with AI-powered interpretation and recommendations.
            </p>
          </div>
        </div>

        {/* Second Row of Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 4 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-primary/10 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Documentation System</h3>
            </div>
            <p className="text-gray-600">
              Create, edit, and manage clinical documentation with voice-enabled note-taking features.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-secondary/10 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Real-time Updates</h3>
            </div>
            <p className="text-gray-600">
              Get instant notifications and updates on patient status, lab results, and care plan changes.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-accent hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-accent/10 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">AI Medical Assistant</h3>
            </div>
            <p className="text-gray-600">
              Leverage AI-powered insights and recommendations to enhance clinical decision-making.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MediMind. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App 