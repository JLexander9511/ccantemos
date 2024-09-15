import WithState from '@/validators/WithState'
import React from 'react'
import SongShowcase from './components/SongShowcase'
import { CircularProgress } from '@mui/material'

function Song({ params }) {
  return (
    <WithState loader={<CircularProgress/>}>
        <SongShowcase id={params.id}/>
    </WithState>
  )
}

export default Song