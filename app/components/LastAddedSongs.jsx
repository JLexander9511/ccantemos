"use client";

import { Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material"
import ArticleIcon from '@mui/icons-material/Article';
import { useDispatch, useSelector } from "react-redux";
import { getLastFiveSongsAdded, goIdle } from "@/store/app";
import { useEffect } from "react";
import Link from "next/link";

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function LastAddedSongs() {

  const {message, last5Songs} = useSelector((state) => state.app)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getLastFiveSongsAdded());

    setTimeout(() => {
      dispatch( goIdle() )
    }, 3000);
  }, [])

  const noItems = <Stack width='100%' justifyContent='center' direction='row'>
                    <Card variant="outlined" sx={{marginY: 2, width: '50%', paddingY: 1}}>
                      <Typography textAlign='center' fontWeight={600}>No hay canciones registradas.</Typography>
                    </Card>
                  </Stack>


  return (
    <Card sx={{marginX:2, marginTop: 5}} variant='outlined'>
        <Typography variant="h2" fontWeight={600} fontSize={25} sx={{marginTop:2, marginLeft: 2}}>Ultimos cantos añadidos</Typography>
        <List sx={{justifyItems: 'center', alignItems:'left', display: 'flex', flexDirection: 'column'}}>
            {(last5Songs.length == 0) && noItems}
            {last5Songs.map((song, index) => (
              <Link href={`/songs/${song.id}`} key={index}>
                <ListItem  disablePadding>
                  <ListItemButton sx={{height:40}}>
                    <ListItemIcon>
                      <ArticleIcon htmlColor="rgb(51 65 85)" />
                    </ListItemIcon>
                    <ListItemText sx={{width:'175px', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap'}} primary={<p className="text-xl font-bold" style={{color: 'rgb(51 65 85)'}}>{capitalize(song.name)}</p>} />
                    <ListItemText primary={<p className="text-sm font-bold self-end text-slate-400 ms-2">({song.date})</p>} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
        </List>
    </Card>
  )
}

export default LastAddedSongs