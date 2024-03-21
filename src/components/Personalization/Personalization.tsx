import React, { useContext } from 'react'
import { GlobalContext } from '../../globalState/GlobalState';

const Personalization = () => {
  const { setPersonalizeBy } = useContext(GlobalContext)

  const commonClasses = "flex gap-2 text-white"

  return (
    <div className='flex gap-5 mt-8 lg:mt-0 flex-col lg:flex-row lg:items-center'>
      <div className='text-white'>Personalize by:</div>
      <div className='flex gap-5 flex-wrap items-center'>
        <label className={commonClasses}>
          <input type="radio" name="personalization" onClick={() => setPersonalizeBy('source')} />
          Source
        </label>
        <label className={commonClasses}>
          <input type="radio" name="personalization" onClick={() => setPersonalizeBy('categories')} />
          Categories
        </label>
        <label className={commonClasses}>
          <input type="radio" name="personalization" onClick={() => setPersonalizeBy('authors')} />
          Authors
        </label>
        <label className={commonClasses}>
          <input type="radio" name="personalization" onClick={() => setPersonalizeBy('none')} />
          None
        </label>
      </div>
    </div>
  );
};


export default Personalization