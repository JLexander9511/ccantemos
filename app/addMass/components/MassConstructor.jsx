"use client";

import { Input, Box, CircularProgress, FormControl, Grid, InputLabel, Typography, Alert } from "@mui/material";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

import { FirebaseApp, FirebaseDB } from "@/firebase/config";
import { SongSelector } from "./SongSelector";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { goIdle, registerMass } from "@/store/app";

const db = getFirestore();

export const MassConstructor = () => {

  const [titleDB, setTitleDB] = useState([])
  const [songList, setSongList] = useState({})
  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm();

  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.app)

  const processing = useMemo( () => status != 'idle', [status])
  const isProcessing = useMemo( () => titleDB.length > 0 , [titleDB])

  const getTitles = async () => {
    const querySnapshot = await getDocs(collection(db, "songs"));

    let titles = []
    querySnapshot.forEach((doc) => {
      titles.push({name: doc.data().name, id: doc.data().id, category: doc.data().category, lyric: doc.data().lyrics, key: doc.data().key})
    });
    setTitleDB(titles);
  }

  useEffect(() => {
    getTitles()
  }, [])

  const onSubmit = (data) => {
    data.songList = songList

    const secure = confirm('Los datos de la misa son correctos?')

    if(secure){
      dispatch(registerMass(data))
  
      setTimeout(() => {
          dispatch( goIdle() );
          //router.push(`/songs/${id}`)
      }, 2000);
  }
  }

  return (
    titleDB &&
    <Grid container justifyContent='left' alignItems='left' direction='column'>

      <form onSubmit={handleSubmit(onSubmit)} style={{margin: '1rem .5rem'}}>
        <Typography variant="h5" fontWeight='bold'>Datos de misa</Typography>

        <FormControl sx={{width: '100%', my:'.25rem'}}>
          <InputLabel htmlFor="massName">Identificador de misa</InputLabel>
          <Input id="massName" {...register("name", {required: true, maxLength: 255})} autoComplete='off'/>
        </FormControl>

        <FormControl sx={{width: '100%', my:'.25rem'}}>
          <InputLabel htmlFor="massDate">Fecha</InputLabel>
          <Input id="massDate" {...register("date", {required: true, maxLength: 255})} autoComplete='off'/>
        </FormControl>

        <FormControl sx={{width: '100%', my:'.25rem'}}>
          <InputLabel htmlFor="massDescription">Descripcion</InputLabel>
          <Input id="massDescription" {...register("description", {required: true, maxLength: 255})} autoComplete='off'/>
        </FormControl>


      <Box sx={{marginTop:2}}>
        <Typography variant="h5" fontWeight='bold'>Canto(s) de entrada</Typography>
        {isProcessing && <SongSelector setter={setSongList} options={titleDB} type='entrada'/> || <CircularProgress/>}
      </Box>

      <Box sx={{marginY:2}}>
        <Typography variant="h5" fontWeight='bold'>Piedad</Typography>
        {isProcessing && <SongSelector setter={setSongList} options={titleDB} type='piedad'/> || <CircularProgress/>}
      </Box>

      <Box>
        <Typography variant="h5" fontWeight='bold'>Gloria</Typography>
        {isProcessing && <SongSelector setter={setSongList} options={titleDB} type='gloria'/> || <CircularProgress/>}
      </Box>

      <Box sx={{marginY:2}}>
        <Typography variant="h5" fontWeight='bold'>Introduccion a la palabra</Typography>
        {isProcessing && <SongSelector setter={setSongList} options={titleDB} type='introduccion' induction/> || <CircularProgress/>}
      </Box>

      <Box>
        <Typography variant="h5" fontWeight='bold'>Interleccional</Typography>
        {isProcessing && <SongSelector setter={setSongList} options={titleDB} type='interleccional' /> || <CircularProgress/>}
      </Box>

      <Box sx={{marginY:2}}>
        <Typography variant="h5" fontWeight='bold'>Ofertorio</Typography>
        {isProcessing && <SongSelector setter={setSongList} options={titleDB} type='ofertorio'/> || <CircularProgress/>}
      </Box>

      <Box>
        <Typography variant="h5" fontWeight='bold'>Santo</Typography>
        {isProcessing && <SongSelector setter={setSongList} options={titleDB} type='santo' /> || <CircularProgress/>}
      </Box>

      <Box sx={{marginY:2}}>
        <Typography variant="h5" fontWeight='bold'>Padre Nuestro</Typography>
        {isProcessing && <SongSelector setter={setSongList} options={titleDB} type='padreNuestro'/> || <CircularProgress/>}
      </Box>

      <Box>
        <Typography variant="h5" fontWeight='bold'>Paz</Typography>
        {isProcessing && <SongSelector setter={setSongList} options={titleDB} type='paz' /> || <CircularProgress/>}
      </Box>

      <Box sx={{marginY:2}}>
        <Typography variant="h5" fontWeight='bold'>Cordero</Typography>
        {isProcessing && <SongSelector setter={setSongList} options={titleDB} type='cordero'/> || <CircularProgress/>}
      </Box>

      <Box>
        <Typography variant="h5" fontWeight='bold'>Comunion</Typography>
        {isProcessing && <SongSelector setter={setSongList} options={titleDB} type='comunion' /> || <CircularProgress/>}
      </Box>

      <Box sx={{marginY:2}}>
        <Typography variant="h5" fontWeight='bold'>Salida</Typography>
        {isProcessing && <SongSelector setter={setSongList} options={titleDB} type='salida'/> || <CircularProgress/>}
      </Box>

      {(status == 'error') && <Alert severity="error" className="mt-2">Ha ocurrido un error.</Alert>}
      {(status == 'success') && <Alert severity="success" className="mt-2">{message}</Alert>}
      <input disabled={processing} type="submit" className="bg-orange-400 p-2 mb-2 ms-2 rounded disabled:bg-slate-500" value='Registrar Misa'/>

      </form>
      
    </Grid> || <CircularProgress/>
  )
}
