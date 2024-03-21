import React, { useContext } from 'react'
import { GlobalContext } from '../../globalState/GlobalState'

const Input = () => {
  const { search, setSearch } = useContext(GlobalContext)
  return (
    <input placeholder='Search date, category or source' className='lg:w-80 mt-8 lg:mt-0 lg:mb-5 w-60' value={search} onChange={e => setSearch(e.target.value)} />
  )
}

export default Input