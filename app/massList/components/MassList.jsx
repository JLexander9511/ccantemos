"use client";

import { Card, CircularProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Link, Typography } from "@mui/material"
import ArticleIcon from '@mui/icons-material/Article';
import NearMeIcon from '@mui/icons-material/NearMe';

import { useEffect, useMemo, useState } from "react";
import { FirebaseApp, FirebaseDB } from "@/firebase/config";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore();


function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function MassList() {

  const [list, setList] = useState([])

  const isProcessing = useMemo( () => list , [list])

  const getMasses = async () => {
    const querySnapshot = await getDocs(collection(db, "masses"));

    let masses = []
    querySnapshot.forEach((doc) => {
      masses.push({name: doc.data().name, id: doc.data().id, date: doc.data().date})
    });
    setList(masses);
  }

  useEffect(() => {
    getMasses()
  }, [])

  return (
    isProcessing && <Card sx={{marginX:2, marginTop: 2}} variant='outlined'>
        <Typography variant="h2" fontWeight={600} fontSize={25} sx={{marginTop:2, marginLeft:2}}>Lista de misas</Typography>
        <List>
            {list.map((mass, index) => (
              <Link href={`/mass/${mass.id}`} key={mass.id}>
                <ListItem key={index} disablePadding>
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
        
    </Card> || <CircularProgress/>
  )
}

export default MassList