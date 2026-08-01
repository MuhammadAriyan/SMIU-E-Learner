import { NextPage } from 'next'

interface Props {}

const ConfigCard: NextPage<Props> = ({}) => {
  return <div>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Configuration</h3>
      <p className="text-gray-600">Manage your settings here.</p>
        </div>
  </div>
}

export default ConfigCard