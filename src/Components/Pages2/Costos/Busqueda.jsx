import { Box, Button, Container, FormControl, CircularProgress, FormControlLabel, Grid, IconButton, makeStyles, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@material-ui/core'
import React, { useRef } from 'react'
import { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import TableChartIcon from '@material-ui/icons/TableChart';
import { useHistory } from 'react-router-dom'
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { AlertOpcionBusqueda } from '../../Atoms/Alerts/Alerts';


const ipcRenderer = window.require('electron').ipcRenderer
const Busqueda = () => {
    const classes = useStyles()
    const history = useHistory()
    const [data, setData] = useState([])
    const [exist, setExist] = useState('none')
    const [progress, setProgress] = useState('none')
    const [opcion, setOpcion] = useState(false)


    //------------------------------------
    const openCloseOpcion = () => {
        setOpcion(!opcion)
    }
    //------------------------------------
    const texto = useRef()
    const buscar = async (e) => {
        e.preventDefault()
        setProgress('block')
        await ipcRenderer.invoke('buscador-mat-submat', { typeTable: 'nameSubMaterials', text: texto.current.value })
            .then(resp => {
                if (JSON.parse(resp.length) === 0) {
                    setExist('block')
                }
                setProgress('none')
                setData(JSON.parse(resp))
            })
            .catch(err => console.log(err))
    }
    // console.log(data)
    //---------------------IR A TARJETA DE EXISTENCIA------------------------------
    const irTarjeta = (e) => {
        // console.log(e)
        const codMaterial = e.codMaterial
        const codSubMaterial = e.codSubMaterial
        const nameMaterial = e.nameMaterial
        const nameSubMaterial = e.nameSubMaterial
        const saldoInicial = e.saldoInicial
        const unidadMedida = e.unidadMedida
        history.push({
            pathname: '/tarjetaExistencia/' + codMaterial + '/' + nameMaterial + '/' + codSubMaterial + '/' + nameSubMaterial + "/" + saldoInicial + "/" + unidadMedida,
            data: {
                codMaterial: codMaterial,
                nameMaterial: nameMaterial,
                codSubMaterial: codSubMaterial,
                nameSubMaterial: nameSubMaterial,
                saldoInicial: saldoInicial,
                unidadMedida: unidadMedida
            }
        })

    }
    const irkardex = (e) => {
        // console.log(e)
        const codMaterial = e.codMaterial
        const codSubMaterial = e.codSubMaterial
        const nameMaterial = e.nameMaterial
        const nameSubMaterial = e.nameSubMaterial
        const saldoInicial = e.saldoInicial
        const unidadMedida = e.unidadMedida
        history.push({
            pathname: '/kardexValorado/' + codMaterial + '/' + nameMaterial + '/' + codSubMaterial + '/' + nameSubMaterial + "/" + saldoInicial + "/" + unidadMedida + '/',
            data: {
                codMaterial: codMaterial,
                nameMaterial: nameMaterial,
                codSubMaterial: codSubMaterial,
                nameSubMaterial: nameSubMaterial,
                saldoInicial: saldoInicial,
                unidadMedida: unidadMedida
            }
        })

    }
    //------------------------------------
    // console.log(data)
    return (
        <>
            <Typography style={{ marginTop: 30, color: 'white', marginBottom: 25 }} align='center'>BUSQUEDA DE MATERIALES</Typography>
            <Container >
                <Container maxWidth='md'>
                    <form onSubmit={buscar}>
                        <Grid container direction='row' justifyContent='space-around' alignItems='center' style={{ marginBottom: 15 }}>
                            <TextField
                                style={{ background: 'white', borderRadius: 5, width: '60%' }}
                                inputRef={texto}
                                // label='Introdusca'
                                variant='outlined'
                                size='small'
                            />
                            <Button
                                type='submit'
                                // onClick={buscar}
                                variant='contained'
                                style={{
                                    color: 'white',
                                    width:'30%',
                                    background: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)'
                                }}
                                endIcon={<SearchIcon />}
                            >Buscar Producto</Button>
                        </Grid>
                    </form>
                </Container>


                {data.length>0 ? (
                    <Paper component={Box} p={1} >
                        <TableContainer style={{ maxHeight: 450 }}>
                            <Table stickyHeader size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ color: 'white', backgroundColor: "black", borderTopLeftRadius: 5 }}>CODIGO</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>MATERIAL</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>SUB-MATERIAL</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>SALDO ACTUAL</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black", borderTopRightRadius: 5 }}>ACCIONES</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data.length > 0 ? (
                                            data.map((e, index) => (
                                                <TableRow key={index} className={classes.tableRow}>
                                                    <TableCell>{e.codSubMaterial}</TableCell>
                                                    <TableCell>{e.nameMaterial}</TableCell>
                                                    <TableCell>{e.nameSubMaterial}</TableCell>
                                                    <TableCell align='right'>{e.cantidadTotal}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title='tarjeta'>
                                                            <IconButton style={{color:'blueviolet'}} size='small' onClick={() => irTarjeta(e)}>
                                                                <FilterNoneIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title='kardex' >
                                                            <IconButton style={{color:'green'}} size='small' onClick={() => irkardex(e)}>
                                                                <CreditCardIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan='4' align='center'>no existen datos</TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                ) : null}
                <div align='center' style={{ display: progress }}>
                    <CircularProgress size={60} style={{ color: 'white' }} />
                </div>
            </Container>

            {/* -------------------------------------------- */}
            <AlertOpcionBusqueda open={opcion} setOpen={openCloseOpcion} />
        </>
    )
}

export default Busqueda

const useStyles = makeStyles((theme) => ({
    textStyles: {
        marginBottom: 10
    },
    tableRow: {
        "&:hover": {
            backgroundColor: "#bbdefb"
        }
    }
}))