import React from 'react'
import { Spin } from 'antd'

const Loader = () => {
  return (
    <div>
      <div className='loader'>
        <Spin size='large' />
      </div>
    </div>
  )
}

export default Loader
