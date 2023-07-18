import { AppBar,Box, Button, Dialog, Grid, makeStyles, Paper, TextField, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'

// toolbar:theme:mixins.toolbar
// content:{
//     flexGrow:1,
//     backgroundColor:theme.palette.background.default,
//     padding:theme.spaciong(3)
// }

const ipcRenderer = window.require('electron').ipcRenderer
const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const AppBarPrincipal = () => {
    const classes=useStyles()
    const [openRegister,setOpenRegister]=useState(false)
    const [changeData,setChangeData]=useState({
        nameUnidadMedida:'',
        simbolo:''
    })

    //-------------POST UNIDAD MEDIDA-------------------------
    const openModalRegister=()=>{
        setOpenRegister(true)
    }
    const closeModalRegister=()=>{
        setOpenRegister(false)
    }
    const postUnidadMedida=async(e)=>{
        e.preventDefault()
        const result= await ipcRenderer.invoke('post-unidadMedida',changeData)
        console.log(result)
        closeModalRegister()
    }
    //------------------------------------------------------
    //------------------------------------------------------
    //------------------------------------------------------
    //------------------------------------------------------
    //----------------------------------------
    
    //------------------------------------------------------
    const handleChange=(e)=>{
        setChangeData({
            ...changeData,
            [e.target.name]:e.target.value
        })
    }
    // console.log(changeData)
    return (
        <>
        {/* <AppBar position='fixed' style={{background:'#424242'}}>
            <Toolbar>
                <div style={{flexGrow:1}}></div>
                <Button size='small' variant='contained' color='primary' onClick={openModalRegister}>U. Medida</Button>
            </Toolbar>
        </AppBar> */}


        <Dialog
            open={openRegister}
            onClose={closeModalRegister}
            maxWidth='xs'
        >
            <Paper component={Box} p={2}>
                <Typography className={classes.spacingBot} variant='subtitle1' align='center'>Registrar Unidad de Medida</Typography>
                <form onSubmit={postUnidadMedida}>
                    <TextField 
                        name='nameUnidadMedida'
                        label='Nombre de unidad de Medida'
                        variant='outlined'
                        fullWidth
                        size='small'
                        className={classes.spacingBot}
                        onChange={handleChange}
                        required
                    />
                    <TextField 
                        name='simbolo'
                        label='Simbolo'
                        variant='outlined'
                        fullWidth
                        size='small'
                        className={classes.spacingBot}
                        onChange={handleChange}
                        required
                    />
                    <Grid container justifyContent='space-evenly'>
                        <Button size='small' variant='contained' color='primary' type='submit'>aceptar</Button>
                        <Button size='small' variant='contained' color='secondary' onClick={closeModalRegister}>cancelar</Button>
                    </Grid>
                </form>
            </Paper>
        </Dialog>
        </>
    )
}

export default AppBarPrincipal
