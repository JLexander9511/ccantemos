import { Card, CircularProgress, Typography } from "@mui/material"
import { AlphList } from "./components/AlphList"

function page() {
  return (
    <Card sx={{marginX:2, marginY: 2}} variant='outlined'>
        <Typography variant="h2" fontWeight={600} fontSize={25} sx={{marginTop:2, marginLeft:2}}>Indice Alfabetico</Typography>
            <AlphList/>
    </Card>
  )
}

export default page