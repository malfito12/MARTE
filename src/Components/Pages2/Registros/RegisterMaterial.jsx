import { Button, Dialog, Paper, Box, Typography, TextField, makeStyles, Grid } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { ErrorAlertsMateriales, SuccessAlertsMateriales } from '../../Atoms/Alerts/Alerts';

const ipcRenderer = window.require('electron').ipcRenderer
const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))

const RegisterMaterial = (props) => {
    const classes = useStyles()
    const [openRegister, setOpenRegister] = useState(false)
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false)
    const [openAlertError, setOpenAlertError] = useState(false)
    const [changeData, setChangeData] = useState({
        nameMaterial: ''
    })

    //---------------POST PRODUCTOS---------------------
    const openModalRegister = () => {
        setOpenRegister(true)
    }
    const closeModalRegister = () => {
        setOpenRegister(false)
    }
    const postMaterial = async (e) => {
        e.preventDefault()
        const result = await ipcRenderer.invoke('post-material', changeData)
            .then(resp => {
                console.log(resp)
                openCloseAlertSuccess()
                closeModalRegister()
                props.uno()
            })
            .catch(err => {
                openCloseAlertError()
                console.log(err)

            })
        // console.log(JSON.parse(result))


    }
    //----------------------------------------------------
    const openCloseAlertSuccess = () => {
        setOpenAlertSuccess(!openAlertSuccess)
    }
    const openCloseAlertError = () => {
        setOpenAlertError(!openAlertError)
    }
    //----------------------------------------------------
    //----------------------------------------------------
    //----------------------------------------------------
    //----------------------------------------------------
    //----------------------------------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    // console.log(changeData)

    return (
        <>
            <SuccessAlertsMateriales open={openAlertSuccess} setOpen={openCloseAlertSuccess} />
            <ErrorAlertsMateriales open={openAlertError} setOpen={openCloseAlertError} />
            <Button
                variant='contained'
                style={{ background: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)', color: 'white' }}
                // size='small'
                endIcon={<BookmarkIcon />}
                onClick={openModalRegister}
            >Registrar
            </Button>
            <Dialog
                open={openRegister}
                onClose={closeModalRegister}
                maxWidth='md'
            // style={{ paddingLeft: 240 }}
            >
                <Paper component={Box} p={2}>
                    <div style={{ marginLeft: '10rem', marginRight: '10rem' }}></div>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>Registrar producto</Typography>
                    <form onSubmit={postMaterial}>
                        <TextField
                            name='nameMaterial'
                            label='Nombre'
                            variant='outlined'
                            className={classes.spacingBot}
                            fullWidth
                            size='small'
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

export default RegisterMaterial
