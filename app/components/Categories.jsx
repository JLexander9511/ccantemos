import { Card, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material"

import CategoryIcon from '@mui/icons-material/Category';

function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const categories = [
    {name: 'adoracion'},
    {name: 'aguinaldo'},
    {name: 'bautismo/aspersion'},
    {name: 'comunion'},
    {name: 'elevacion'},
    {name: 'entrada'},
    {name: 'espirituSanto'},
    {name: 'gloria'},
    {name: 'interleccional'},
    {name: 'mariano'},
    {name: 'ofertorio'},
    {name: 'padreNuestro'},
    {name: 'paz'},
    {name: 'piedad'},
    {name: 'salida'},
    {name: 'santo'},
    {name: 'varios'},
]

function Categories() {
  return (
    <Card sx={{marginX:2, marginY: 2}} variant='outlined'>
        <Typography variant="h2" fontWeight={600} fontSize={25} sx={{marginTop:2, marginLeft:2}}>Categorias</Typography>
        <List>
            {categories.map((cat, index) => (
                <ListItem key={index} disablePadding>
                  <Link href={`/categories/${cat.name}`}>
                    <ListItemButton sx={{height:40}}>
                      <ListItemIcon>
                        <CategoryIcon htmlColor="rgb(51 65 85)"/>
                      </ListItemIcon>
                      <ListItemText primary={<p className="text-xl font-bold" style={{color: 'rgb(51 65 85)'}}>{capitalize(cat.name)}</p>} />
                    </ListItemButton>
                  </Link>
                </ListItem>
            ))}
        </List>
    </Card>
  )
}

export default Categories