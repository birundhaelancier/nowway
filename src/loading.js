import React from 'react'
import './components/global-components/seopage.scss'
import { Puff } from 'react-loading-icons'
export default function loading() {
  return (
    <div className='loading'>
    <div><Puff stroke="red" width="150px" height="150px" strokeOpacity={.125} />
    <div className='load'>loading...</div>
    </div>
    </div>
  )
}
