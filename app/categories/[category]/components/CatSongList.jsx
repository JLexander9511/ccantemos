"use client";

import { CircularProgress, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import CategoryIcon from '@mui/icons-material/Category';

import { FirebaseApp, FirebaseDB } from "@/firebase/config";

const db = getFirestore();

function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const CatSongList = ({category}) => {

    const [songList, setSongList] = useState()
    
    const obtenerDatos = async (data) => {
        try {
            
            const q = query(collection(db, "songs"), where("category", "==", data));

            const querySnapshot = await getDocs(q);
    
            const list = []

            querySnapshot.forEach((doc) => {
            list.push({id: doc.data().id, name: doc.data().name})
            })

            setSongList(list);
      }catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    useEffect(() => {   
        obtenerDatos(category)
    }, [])
    
  return (
    <List>
        {songList && songList.map((cat, index) => (
            <Link href={`/songs/${cat.id}`} key={cat.id}>
                <ListItem  disablePadding>
                    <ListItemButton sx={{height:40}}>
                    <ListItemIcon>
                        <CategoryIcon htmlColor="rgb(51 65 85)"/>
                    </ListItemIcon>
                    <ListItemText sx={{width:'250px', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap'}} primary={<p className="text-xl font-bold" style={{color: 'rgb(51 65 85)'}}>{capitalize(cat.name)}</p>} />
                    </ListItemButton>
                </ListItem>
              </Link>
            )) || <CircularProgress/>}
    </List>
  )
}
