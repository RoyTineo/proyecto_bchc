import React from 'react'

const TextHeader=({text,...props})=> {
  return (
    <h2 className=" text-xl font-bold text-gray-800 ">{text}</h2>
  )
}
export default TextHeader;
