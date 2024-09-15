"use client";

import { getSongData } from '@/store/app';

import { Box, Chip, CircularProgress, IconButton, Stack, Typography } from '@mui/material';

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import Grid from '@mui/material/Unstable_Grid2';
import EditIcon from '@mui/icons-material/Edit';
import boldTextMaker from '@/utils/boldTextMaker';
import { Margin } from '@mui/icons-material';
import { SongLyrics } from './SongLyrics';
import { SongInfo } from './SongInfo';

function SongShowcase({id}) {

  const {songData} = useSelector((state) => state.app)
  const {role} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true)

    useEffect(() => {
      (songData.id != id) && dispatch(getSongData(id)) 
      if(songData.id == id) setLoading(false)
    }, [songData])

  return (
    (!isLoading && <SongInfo songData={songData} role={role}/>) || <CircularProgress/>
  )
}

export default SongShowcase