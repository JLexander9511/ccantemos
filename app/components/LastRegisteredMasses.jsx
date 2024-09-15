"use client";

import { Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, Link } from "@mui/material"

import ArticleIcon from '@mui/icons-material/Article';
import NearMeIcon from '@mui/icons-material/NearMe';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLastFiveMassesAdded, goIdle } from "@/store/app";

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function LastRegisteredMasses() {

  const {message, last5Masses} = useSelector((state) => state.app)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLastFiveMassesAdded());

    setTimeout(() => {
      dispatch( goIdle() )
    }, 3000);
  }, [])

  return (
    <Card sx={{marginX:2, marginTop: 2}} variant='outlined'>
        <Typography variant="h2" fontWeight={600} fontSize={25} sx={{marginTop:2, marginLeft:2}}>Ultimas misas registradas</Typography>
        <List>
            {last5Masses.map((mass, index) => (
              <Link href={`/mass/${mass.id}`} key={index}>
                  <ListItem disablePadding>
                  <ListItemButton sx={{height:40}}>
                    <ListItemIcon>
                      <ArticleIcon htmlColor="rgb(51 65 85)"/>
                    </ListItemIcon>
                    <ListItemText primary={<p className="text-xl font-bold" style={{color: 'rgb(51 65 85)'}}>{mass.name}</p>} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
        </List>
        <Stack alignItems='end' pr={2} margin='5px'>
          <Link href='/massList'>
              <NearMeIcon/> Vea las misas registradas
          </Link>
        </Stack>
    </Card>
  )
}

export default LastRegisteredMasses