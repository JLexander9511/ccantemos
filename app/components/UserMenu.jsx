import { Box, Button, Divider, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import Grid from '@mui/material/Unstable_Grid2'; 
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import { startLogout } from '@/store/auth';

function UserMenu() {
    
    const {errorMessage, status, displayName} = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [loginDialogOpened, setLoginDialogOpened] = useState(false)
    const [registerDialogOpened, setRegisterDialogOpened] = useState(false)

    const guessMenu = (<Box>
                        <Grid container direction='column' alignItems='center' justifyContent='center' sx={{marginY: 1}}>
                            <PersonIcon fontSize='large' htmlColor='black'/>
                            <Typography variant='p' fontSize={18} fontWeight={600}>Invitado</Typography>
                        </Grid>
                        <Divider/>
                        <MenuItem sx={{bgcolor: '#ff9f66', margin: 1, borderRadius: 1}} onClick={() => setLoginDialogOpened(true)}>Iniciar sesion</MenuItem>
                        <MenuItem sx={{bgcolor: '#ff9f66', margin: 1, borderRadius: 1}} onClick={() => setRegisterDialogOpened(true)}>Registro</MenuItem></Box>)
    
    const userMenu = (<Box>
                        <Grid container direction='column' alignItems='center' justifyContent='center' sx={{marginY: 1}}>
                            <PersonIcon fontSize='large' htmlColor='black'/>
                            <Typography variant='p' fontSize={18} fontWeight={600}>{ displayName }</Typography>
                        </Grid>
                        <Divider/>
                        <MenuItem sx={{bgcolor: '#ff9f66', margin: 1, borderRadius: 1}} onClick={() => dispatch(startLogout())}>Cerrar Sesion</MenuItem></Box>)
  return (
    <>
        <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
            {(status == 'not-authenticated') ? <LoginIcon fontSize='large' htmlColor='black'/> : <PersonIcon fontSize='large' htmlColor='black'/>}
        </Button>

        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 45,
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {(status == 'not-authenticated') && guessMenu || userMenu}

        <LoginDialog isOpen={loginDialogOpened} handleClose={setLoginDialogOpened}/>
        <RegisterDialog isOpen={registerDialogOpened} handleClose={setRegisterDialogOpened}/>
      </Menu>
    </>
  )
}

export default UserMenu