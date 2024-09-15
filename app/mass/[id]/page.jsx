"use client";

import { Box, Chip, Divider, Grid, Stack, Typography } from '@mui/material'
import { FirebaseApp, FirebaseDB } from "@/firebase/config";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useMemo, useState } from 'react';
import { SongLyrics } from '@/app/songs/[id]/components/SongLyrics';

const db = getFirestore();

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const titleOrder = {
  'entrada': 'entry',
  'piedad': 'mercy',
  'gloria': 'glory',
  'introduccion': 'induction',
  'interleccional': 'gospel',
  'ofertorio': 'offertory',
  'santo': 'saint',
  'padreNuestro': 'ourFather',
  'paz': 'peace',
  'cordero': 'lamb',
  'comunion': 'communion',
  'salida': 'exit'
}
const order = Object.keys(titleOrder)

function page({params}) {

  const id = params.id

  const [massData, setMassData] = useState()

  const isProcessing = useMemo( () => massData != undefined , [massData])

  const getMassData = async (id) => {
    const docSnap = await getDoc(doc(db, "masses", id));

    if (docSnap.exists()) {
      setMassData(docSnap.data())
    } else {
      throw new Error("No data found");
    }
  }

  useEffect(() => {
    getMassData(id)
  }, [])

  return (
    isProcessing && <Box padding={1}>
      <Grid container direction='column'>
        <Typography variant='h2' fontWeight={600} fontSize={38} color='#0b5394'>{capitalize(massData.name)}</Typography>
        <Typography variant='h3' fontWeight={600} fontSize={32}>{ massData.date }</Typography>
        <Typography variant='h3' fontWeight={500} fontSize={24} color='#5b5b5b'>{massData.description}</Typography>

        {order.map((songTitle, index) => <Box padding={1} key={index}>

          <Typography variant='h3' fontSize={26} fontWeight='bold' color='#000'>{capitalize(songTitle)}</Typography>
          <Divider sx={{marginY: 1}}/>

        {massData.songList[titleOrder[songTitle]].map((song, index) => (
          <Box key={index}>
            <Typography variant='h4' fontSize={22} fontWeight='bold' color='#000' textOverflow='ellipsis' whiteSpace='normal'>{capitalize(song.name)}</Typography>
            <Stack marginY={1} direction='row'>
              {song.key.map((key, index) => 
                
                  <Chip sx={{marginRight: '5px', backgroundColor: (index == 0 ? '#233FBC' : '#F5A9BB'), color: (index == 0 ? 'white' : 'black')}} label={key} key={index}/>

              )}
            </Stack>
            <SongLyrics lyric={song.lyric}/>
          </Box>
        ))}
          </Box>)}        
      </Grid>
    </Box>
  )
}

export default page