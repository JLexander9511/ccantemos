"use client";

import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import Grid from '@mui/material/Unstable_Grid2'; 

import { useWindowSize } from "@uidotdev/usehooks";

function CantemosText() {

  const {width} = useWindowSize();

  return (
    <Box sx={{height: '100px'}}>
        {(!width) 
            ? <Grid container justifyContent='center' alignItems='center' marginTop={5}><CircularProgress /></Grid>  
            : <Grid container justifyContent='center' alignItems='center'>
                <Image
                src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1698856312/Cancionero-Cantemos-1-11-2023_ty2zta.png'
                alt='Logo 2'
                width={width}
                height={150}
                />
             </Grid>}
       
      </Box>
  )
}

export default CantemosText