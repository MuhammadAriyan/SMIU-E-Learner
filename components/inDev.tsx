import { NextPage } from 'next'

interface Props {}

const InDev: NextPage<Props> = ({}) => {
  return <div className='white-bg text-black/70 w-full text-sm text-center'>This Project is in development!! And some of the functionalities are not yet implemented.</div>
}

export default InDev