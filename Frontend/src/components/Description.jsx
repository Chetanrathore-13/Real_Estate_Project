import React from 'react'

const Description = ({title,Description}) => {
  return (
    <div className="authentication__page--container absolute top-20 left-20 bg-white p-6 w-[50%]">
    <h2 className='text-black text-md font-bold'>{title}</h2>
    <p>{Description}</p>
</div>
  )
}

export default Description
