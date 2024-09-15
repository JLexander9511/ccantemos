"use client";

import { CircularProgress, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

import CategoryIcon from '@mui/icons-material/Category';

import { FirebaseApp, FirebaseDB } from "@/firebase/config";

const db = getFirestore();

function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const AlphList = () => {

    const [alphList, setAlphList] = useState()

    const obtenerDatos = async (data) => {
        try {
            
            const docSnap = await getDoc(doc(db, "indexes", "alphabeticalIndex"));

            let list = []
            if (docSnap.exists()) {
                for (let key in docSnap.data()) {
                    list.push({key: key, data: docSnap.data()[key]})
                  }
            } 
            setAlphList(list)
      }catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    const KeyList = ({data}) => {
      const {key, data: keyListData} = data
      return(<ListItem  disablePadding>
                  <Stack>
                    <ListItemText primary={<p className="text-3xl font-bold" style={{color: 'rgb(51 65 85)'}}>{capitalize(key)}</p>} />
                    {keyListData.length > 0 && 
                      <List>
                          {keyListData.map(({name, id}, index) => (
                              <ListItem key={index} disablePadding>
                                <Link href={`/songs/${id}`}>
                                  <ListItemButton sx={{height:40}}>
                                    <ListItemIcon>
                                      <CategoryIcon htmlColor="rgb(51 65 85)"/>
                                    </ListItemIcon>
                                    <ListItemText sx={{width:'250px', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap'}} primary={<p className="text-xl font-bold" style={{color: 'rgb(51 65 85)'}}>{name}</p>} />
                                  </ListItemButton>
                                </Link>
                              </ListItem>
                          ))}
                      </List>}
                  </Stack>  
            </ListItem>)
    }

    useEffect(() => {
        obtenerDatos()

    }, [])
    

  return (
    <List>
        {alphList && alphList.sort((a, b) => a.key.localeCompare(b.key)).map((key, index) => <KeyList data={key} key={index}/>) || <CircularProgress/>}
    </List>
  )
}

