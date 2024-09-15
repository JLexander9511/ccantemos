"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Box, CircularProgress, Stack } from '@mui/material';
import Hamburger from 'hamburger-react'
import Grid from '@mui/material/Unstable_Grid2'; 
import SideMenu from './SideMenu';

import SearchIcon from '@mui/icons-material/Search';
import WithState from '@/validators/WithState';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';

function Navbar() {

    const [isOpen, setOpen] = useState(false)
    const [searchInput, setSearchInput] = useState(false)

  return (
    <Box padding={2} bgcolor='#f0f0f0'>
        <Grid container alignItems='center'>

            <Grid xs={2}>
                <Hamburger toggled={isOpen} toggle={setOpen}/>
                <SideMenu openState={isOpen} toggleHamburger={setOpen}/>
            </Grid>
            
            <Grid xs={2}>
               <Image 
                src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1698716984/cantemos-logo-a_ytefmw.png'
                width={60}
                height={60}
                alt='Logo'/>
            </Grid>
            
            <Grid xs={8}>
                <Stack direction="row" spacing={1} justifyContent='end' alignItems='center' >

                    <Box>
                        <SearchIcon fontSize='large' className='cursor-pointer' onClick={() => setSearchInput(!searchInput)}/>
                        <WithState loader={<CircularProgress />}>
                            <UserMenu/>
                        </WithState>
                    </Box>

                </Stack>        
            </Grid>

        </Grid>

        {searchInput && <SearchBar/>}
        
    </Box>
    
  )
}

export default Navbar