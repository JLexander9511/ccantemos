import WithState from '@/validators/WithState'
import { Card, CircularProgress, Grid, Typography } from '@mui/material'
import { EditForm } from './components/EditForm'

function EditSong ({ params }) {
  return (
    <Grid container padding={2} direction='column'>
    <Typography variant="h1" fontSize={34} fontWeight={600}>Editar canto</Typography>
    <Card variant="outlined" sx={{marginTop: 1}}>
      <WithState loader={<CircularProgress />}>
        <EditForm id={params.id}/>
      </WithState>
    </Card>
  </Grid>
  )
}

export default EditSong