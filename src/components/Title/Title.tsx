import React from 'react'
import "./title.css"
import Zigzag from '../Zigzag/Zigzag'

const Title = () => {
  return (
    <>
    <Zigzag startX={0} startY={100} endX={1400} endY={1800} segmentWidths={[70, 50, 20, 80, 30,40,30,0,40]} segmentHeights={[55, 25, 10, 140, 30,125,70,-80,120]} />
    <h1 className='home__title'>go surf</h1>
    </>
  )
}

export default Title