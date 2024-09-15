import { clearMessage, goIdle } from "@/store/app";
import { clearErrorMessage, startCreatingUserWithEmailPassword } from "@/store/auth";
import { Alert, Dialog, DialogTitle, Divider, FormControl, Input, InputLabel, Stack } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import { useMemo } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";

const errorMsgHandle = {
    'Firebase: Error (auth/email-already-in-use).': 'Email ya en uso'
 }

function RegisterDialog({isOpen, handleClose}) {

    const {errorMessage, status} = useSelector((state) => state.auth)
    const {message, status:appStatus} = useSelector((state) => state.app)

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();

    const isProcessing = useMemo( () => appStatus != 'idle', [appStatus])
    
    const onSubmit = (data) => {
        dispatch(startCreatingUserWithEmailPassword(data))

        setTimeout(() => {
            dispatch(goIdle())
            reset();
            handleClose(false);
        }, 5000);
      };

  return (
    <Dialog open={isOpen} onClose={() => {handleClose(false); dispatch(clearErrorMessage()); dispatch( clearMessage());}}>
        <Grid container padding={1} justifyContent='center'>
            <DialogTitle fontSize={25} fontWeight={600}>Registro de usuario</DialogTitle>
            <Divider/>
            <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>

                <Stack direction='column' justifyItems='center' alignItems='center' sx={{marginX: 3}}>

                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="component-simple">Nombre y apellido</InputLabel>
                        <Input 
                            type='text' 
                            id="component-simple" 
                            placeholder="Nombre y apellido"
                            {...register("displayName", {required: true})}/>
                        {errors.displayName?.type === 'required' && <p className='text-red-600 font-medium mt-2'>Ingrese el nombre y apellido</p>}
                    </FormControl>

                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="component-simple">Email</InputLabel>
                        <Input 
                            type="text" 
                            id="component-simple" 
                            placeholder="Email"
                            {...register("email", {required: true, pattern: /^\S+@\S+$/i})}/>
                        {errors.email?.type === 'required' && <p className='text-red-600 font-medium mt-2'>Ingrese el correo</p>}
                        {errors.email?.type === 'pattern' && <p className='text-red-600 font-medium mt-2'>Ingrese un correo valido</p>}
                    </FormControl>

                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="component-simple">Contraseña</InputLabel>
                        <Input 
                            type="password" 
                            id="component-simple" 
                            placeholder="Contraseña"
                            {...register("password", {required: true, maxLength: 50})}/>
                        {errors.password?.type === 'required' && <p className='text-red-600 font-medium mt-2'>Ingrese la contraseña</p>}
                    </FormControl>

                    {errorMessage && <Alert severity="error" className="mt-2">{errorMsgHandle[errorMessage] || 'Ha ocurrido un error.'}</Alert>}
                    {(appStatus == 'success') && <Alert severity="success" className="mt-2">{message}</Alert>}
                    
                    <input disabled={isProcessing} type="submit" className="bg-orange-400 p-2 mt-4 mb-2 rounded disabled:bg-slate-500" defaultValue='Registrar usuario'/>
                </Stack>
                
            </form>
        </Grid>

    </Dialog>
  )
}

export default RegisterDialog