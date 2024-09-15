import { Card, CircularProgress, Typography } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import { MassConstructor } from "./components/MassConstructor";
import WithState from "@/validators/WithState";



function page() {
  return (
  <Grid container padding={2} direction='column'>
    <Typography variant="h1" fontSize={34} fontWeight={600}>Armar misa</Typography>
    <Card variant="outlined" sx={{marginTop: 1}}>
      <WithState loader={null}>
        <MassConstructor/>
      </WithState>
      
    </Card>
  </Grid>
  )
}

export default page