import { Alert, Box, Chip, CircularProgress, Divider, IconButton, Link, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import boldTextMaker from '@/utils/boldTextMaker';
import { Margin } from '@mui/icons-material';
import { SongLyrics } from './SongLyrics';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSong, goIdle } from '@/store/app';
import { useRouter } from 'next/navigation';

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const SongInfo = ({songData, role}) => {

  const {status} = useSelector((state) => state.app)
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDelete = () => {
    const secure = confirm('Esta seguro que desea eliminar esta cancion?')

    if(secure){
      dispatch(deleteSong(songData.id))

      setTimeout(() => {
        dispatch( goIdle() );
        router.push(`/`)
    }, 5000);

      
    }
  }

  const adminControls = 
    <Stack direction='row'>
      <Link href={`/editSong/${songData.id}`}>
        <IconButton onClick={null}>
          <EditIcon fontSize='large' htmlColor='black'/>
        </IconButton>
      </Link>

      <IconButton onClick={handleDelete}>
        <DeleteIcon fontSize='large' htmlColor='black'/>
      </IconButton>
    </Stack>


  return (
   <Box padding={1}>
    <Grid container direction='column'>
      <Stack direction='column'>
        <Typography variant='h2' fontWeight={600} fontSize={38} color='#0b5394'>{capitalize(songData.name)}</Typography>
        <Typography variant='h3' fontWeight={600} fontSize={32}>{ songData.category.charAt(0).toUpperCase() + songData.category.slice(1) }</Typography>
        <Typography variant='h3' fontWeight={500} fontSize={24} color='#5b5b5b'>{songData.author}</Typography>
        <Divider sx={{marginY: 2}}/>
        
        <Stack marginY={1} direction='row'>
          {songData.tags.map((tag, index) => 
          
              <Chip sx={{marginRight: '5px'}} label={tag} key={index}/>

          )}

        </Stack>
        <Stack marginY={1} direction='row'>
        {songData.key.map((key, index) => 
          
            <Chip sx={{marginRight: '5px', backgroundColor: (index == 0 ? '#233FBC' : '#F5A9BB'), color: (index == 0 ? 'white' : 'black')}} label={key} key={index}/>

        )}
        </Stack>
      </Stack>



      {role == 'admin' && adminControls} 
      {(status == 'error') && <Alert severity="error" className="mt-2">Ha ocurrido un error.</Alert>}
      {(status == 'success') && <Alert severity="success" className="mt-2">Eliminado con exito!</Alert>}
      
    </Grid>

    <Grid container direction='column' width='100%'>
        <SongLyrics lyric={songData.lyrics}/>
    </Grid>

    {(songData.reference) && <p style={{fontSize:18}}>Referencia: <q style={{fontSize:18}}> {songData.reference}</q></p>}
    {(songData.link) && <><Divider sx={{mb:1}}/>
    <Link href={songData.link} sx={{fontSize:20}} target="_blank" rel="noopener">Link al video</Link> </>}
    
    <Divider sx={{mt:1}}/>

    <Typography variant='h5' fontWeight={500} fontSize={17} color='#999999' marginTop='1rem'>Agregado por: {songData.userRelated} - {songData.date}</Typography>
    {(songData.modifUser) && <Typography variant='h5' fontWeight={500} fontSize={17} color='#999999'>Ultima modificacion: {songData.modifUser} - {songData.modifDate}</Typography>}

</Box>
  )
}
