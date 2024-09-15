import WithState from "@/validators/WithState";
import { Card, CircularProgress, Typography } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import SongForm from "./components/SongForm";


function page() {
  return (
  <Grid container padding={2} direction='column'>
    <Typography variant="h1" fontSize={34} fontWeight={600}>Añadir canto</Typography>
    <Card variant="outlined" sx={{marginTop: 1}}>
      <WithState loader={<CircularProgress />}>
        <SongForm/>
      </WithState>
    </Card>
  </Grid>
  )
}

export default page