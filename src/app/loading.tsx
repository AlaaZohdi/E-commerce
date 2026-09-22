import React from 'react'
import BeatLoader from './../../node_modules/react-spinners/esm/BeatLoader';

export default function Loading() {
  return (
    <div className='h-screen flex justify-center items-center'>
    <BeatLoader
  color="#16A34A"
  size={20}
/>
    </div>
  )
}
