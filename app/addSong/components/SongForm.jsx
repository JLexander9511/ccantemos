"use client";

import { Card, FormControl, InputLabel, Typography, Input, Stack, Select, MenuItem, TextareaAutosize, Alert } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import { useMemo, useState } from "react";
import { useForm } from 'react-hook-form';
import KeySelector from "./KeySelector";
import TagSelector from "./TagSelector";
import { useDispatch, useSelector } from "react-redux";
import { goIdle, registerSong } from "@/store/app";

function SongForm() {

  const dispatch = useDispatch();
  const {message, status, songData} = useSelector((state) => state.app)
  const { displayName } = useSelector((state) => state.auth)

  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();
  const [category, setCategory] = useState(songData.category);
  const [tags, setTags] = useState([]);
  const [key, setKey] = useState([]);

  const isProcessing = useMemo( () => status != 'idle', [status])

  const onSubmit = data => {
    data.category = category;
    data.tags = tags.map((tag) => tag.text);
    data.keys = key.map((key) => key.text);
    data.userRelated = (displayName) ? displayName : null
    data.lyrics = getValues('lyrics');

    const secure = confirm('Los datos de la cancion a registrar son correctos?')
    
    if(secure){
        dispatch(registerSong(data))
    
        setTimeout(() => {
            dispatch( goIdle() );
            reset();
        }, 3000);
    }
  }

  const handleChange = (event) => setCategory(event.target.value);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction='column' padding={1} paddingTop={2}>

          <FormControl>
            <InputLabel htmlFor="songName">Nombre</InputLabel>
            <Input id="songName" {...register("name", {required: true, maxLength: 255})} autoComplete='off' />
          </FormControl>

          <FormControl sx={{marginTop: 2}}>
            <InputLabel htmlFor="author">Autor</InputLabel>
            <Input id="author" {...register("author", {required: false, maxLength: 255})} autoComplete='off' />
          </FormControl>

          <FormControl fullWidth sx={{marginTop:2}}>
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="category"
                onChange={handleChange}
              >
                <MenuItem value='adoracion' selected>Adoracion</MenuItem>
                <MenuItem value='aguinaldo'>Aguinaldo</MenuItem>
                <MenuItem value='bautismo/aspersion'>Bautismo o Aspersion</MenuItem>
                <MenuItem value='comunion'>Comunion</MenuItem>
                <MenuItem value='cordero'>Cordero</MenuItem>
                <MenuItem value='elevacion'>Elevacion</MenuItem>
                <MenuItem value='entrada'>Entrada</MenuItem>
                <MenuItem value='espirituSanto'>Espiritu Santo</MenuItem>
                <MenuItem value='gloria'>Gloria</MenuItem>
                <MenuItem value='interleccional'>Interleccional</MenuItem>
                <MenuItem value='mariano'>Mariano</MenuItem>
                <MenuItem value='ofertorio'>Ofertorio</MenuItem>
                <MenuItem value='padreNuestro'>Padre Nuestro</MenuItem>
                <MenuItem value='paz'>Paz</MenuItem>
                <MenuItem value='cordero'>Cordero</MenuItem>
                <MenuItem value='piedad'>Piedad</MenuItem>
                <MenuItem value='salida'>Salida</MenuItem>
                <MenuItem value='santo'>Santo</MenuItem>
                <MenuItem value='varios'>Varios</MenuItem>
              </Select>
            </FormControl>

          <Card variant="outlined" sx={{marginTop:2, padding:1}}>
            <Typography sx={{color: '#797979'}}>Tags</Typography>
            <TagSelector addTags={setTags}/>
          </Card>

          <Card variant="outlined" sx={{marginTop:2, padding:1}}>
            <Typography sx={{color: '#797979'}}>Tono(s) - 1. Masculino, 2.Femenino</Typography>
            <KeySelector addKeys={setKey}/>
          </Card>

          <FormControl sx={{marginTop: 2}}>
            <InputLabel htmlFor="songLink">Link YT</InputLabel>
            <Input id="songLink" {...register("link", {required: false, maxLength: 255})} autoComplete='off'/>
          </FormControl>

          <FormControl sx={{marginTop: 2}}>
            <InputLabel htmlFor="songReference">Referencia a la cancion</InputLabel>
            <Input id="songReference" {...register("reference", {required: false, maxLength: 255})} autoComplete='off' placeholder="ej. Gloria cumbia, Santo Tres voces, etc."/>
          </FormControl>

          <Grid container direction='column' sx={{marginTop: 2}}>
            <Typography sx={{color: '#797979'}}>Introduzca la letra</Typography>
            <TextareaAutosize
                maxRows={25}
                aria-label="maximum height"
                placeholder="Introduzca la letra de la cancion"
                style={{fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: 1.5,
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #DAE2ED',
                        marginTop: 2,
                        height: '500px'
                        }}
                {...register("lyrics", {required: true, maxLength: 10000})}
            />
          </Grid>

        </Grid>
      

        {(status == 'error') && <Alert severity="error" className="mt-2">Ha ocurrido un error.</Alert>}
        {(status == 'success') && <Alert severity="success" className="mt-2">{message}</Alert>}
        <input disabled={isProcessing} type="submit" className="bg-orange-400 p-2 mb-2 ms-2 rounded disabled:bg-slate-500" value='Registrar'/>
        <button disabled={isProcessing} className="bg-orange-400 p-2 mb-2 ms-2 rounded disabled:bg-slate-500" onClick={() => reset() }>Resetear</button>
      </form> 
  )
}

export default SongForm