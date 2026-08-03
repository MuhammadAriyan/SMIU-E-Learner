"use client"
import { setConfig } from '@/app/actions/setConfig'
import { NextPage } from 'next'
import {  useState } from 'react'
interface Props {className?:string}

const ConfigCard: NextPage<Props> = ({className}) => {
  const [apiKey, setApiKey] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [model, setModel] = useState('')


  return<div className={`flex chat h-screen w-screen justify-center items-center ${className}`}>
    <div className="bg-white p-4 rounded-lg w-1/2 shadow-md">
      <h3 className="text-lg font-bold mb-2">Configuration</h3>
      <p className="text-gray-600">Manage your settings here.</p>
    <form className="mt-4" onSubmit={async (e) => {
          e.preventDefault()
          await setConfig(apiKey, baseUrl, model)
        }}>
        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-gray-700 font-semibold mb-1">API Key</label>
          <input type="text" id="apiKey"
          name="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="baseUrl"
           className="block text-gray-700 font-semibold mb-1">Base URL</label>
          <input type="text" id="baseUrl"
           name="baseUrl" value={baseUrl}
           onChange={(e) => setBaseUrl(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block text-gray-700 font-semibold mb-1">Model</label>
          <input type="text" id="model" name="model" value={model} onChange={(e) => setModel(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="bg-black/80 text-white px-4 py-2 rounded hover:bg-black/60">Save Settings</button>
      </form>
    </div>
  </div>
}

export default ConfigCard