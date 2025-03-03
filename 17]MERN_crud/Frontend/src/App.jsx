import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>


      <div class="flex items-center justify-center min-h-screen">
        <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 class="text-2xl font-bold text-center text-gray-700 mb-4">Sign Up</h2>
          <form>
            <div class="mb-4">
              <label class="block text-gray-600 text-sm font-medium" for="name">Name</label>
              <input type="text" id="name" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div class="mb-4">
              <label class="block text-gray-600 text-sm font-medium" for="email">Email</label>
              <input type="email" id="email" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div class="mb-4">
              <label class="block text-gray-600 text-sm font-medium" for="password">Password</label>
              <input type="password" id="password" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Sign Up</button>
          </form>
        </div>
      </div>

    </>
  )
}

export default App
