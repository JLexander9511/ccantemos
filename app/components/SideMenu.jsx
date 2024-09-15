import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2'; 
import Image from "next/image";
import { usePathname } from 'next/navigation'
import Link from "next/link";

import AddIcon from '@mui/icons-material/Add';
import AddHomeIcon from '@mui/icons-material/AddHome';
import ViewListIcon from '@mui/icons-material/ViewList';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AbcIcon from '@mui/icons-material/Abc';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';

function SideMenu({openState, toggleHamburger}) {

    const pathname = usePathname()

    const icons = {
        'Añadir cancion': <AddIcon fontSize="large"/>,
        'Armar misa': <AddHomeIcon fontSize="large"/>,
        'Lista de misas': <ViewListIcon fontSize="large"/>,
        'Misa aleatoria': <ShuffleIcon fontSize="large"/>,
        'Indice alfabetico': <AbcIcon fontSize="large"/>,
        'Categorias': <CategoryIcon fontSize="large"/>,
    }

    const list = () => (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          //onClick={toggleDrawer(anchor, false)}
          //onKeyDown={toggleDrawer(anchor, false)}
        >
          <Grid container alignItems='center' padding={2}>
            <Grid xs={4}>
               <Image 
                src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1698716984/cantemos-logo-a_ytefmw.png'
                width={60}
                height={60}
                alt='Logo'/>
            </Grid>

            <Grid xs={8}>
               <Typography variant="h4">
                    Menu
               </Typography>
            </Grid>
          </Grid>
    
          <Divider />
          
          <List>
          {(pathname != '/') && 
          <Link href='/' key='index' onClick={() => toggleHamburger(false)}>
              <ListItem disablePadding >
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon fontSize="large"/>
                  </ListItemIcon>
                  
                    <ListItemText primary={<p className="text-xl font-bold text-slate-600">Inicio</p>} />
                </ListItemButton>
              </ListItem>
            </Link>}
            {[{name: 'Categorias', link: '/categories'}, 
            {name: 'Añadir cancion', link: '/addSong'}, 
            {name: 'Armar misa', link: '/addMass'}, 
            {name: 'Lista de misas', link: '/massList'}, 
            /*{name: 'Misa aleatoria', link: '/randomMass'},*/   
            {name: 'Indice alfabetico', link: '/alphIndex'}].map(({name, link}) => (
              <Link href={link} key={name} onClick={() => toggleHamburger(false)}>
                <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {icons[name]}
                      </ListItemIcon>
                      <ListItemText primary={<p className="text-xl font-bold text-slate-600">{name}</p>} />
                    </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      );

  return (
    <Drawer
        anchor='left'
        open={openState}
        onClose={() => toggleHamburger(false)}
        >
        {list()}
    </Drawer>
  )
}

export default SideMenu