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
    const [table, setTable] = useState('flex')
    const [tableMaterial, setTableMaterial] = useState('none')
    const [tableSubMaterial, setTableSubMaterial] = useState('none')
    const [data, setData] = useState([])
    const [value, setValue] = useState(null)
    const [progress, setProgress] = useState('none')
    const [opcion,setOpcion]=useState(false)
    const [exist, setExist] = useState('none')


    //------------------------------------
    const openCloseOpcion=()=>{
        setOpcion(!opcion)
    }
    //------------------------------------
    const texto = useRef()
    const buscar = async (e) => {
        e.preventDefault()
        if(value==='nameMaterials'|| value==='nameSubMaterials'){
            setProgress('block')
            await ipcRenderer.invoke('buscador-mat-submat', { typeTable: value, text: texto.current.value })
            .then(resp => {
                if (JSON.parse(resp.length) === 0) {
                    setExist('block')
                }
                setProgress('none')
                setData(JSON.parse(resp))
            })
            .catch(err => console.log(err))
        }else{
            openCloseOpcion()
        }
    }
    // console.log(data)
    //--------------------IR A SUB-MATERIALES--------------------------
    const irSubMateriales = (e) => {
        const code = e.codMaterial
        const nameMaterial = e.nameMaterial
        history.push({
            pathname: '/listaSubmateriales/' + code + '/' + nameMaterial,
            data: { code: code, nameMaterial: nameMaterial },
            search: '?update=true',
            state: { update: true }
        })
        // history.push('/listaSubmateriales')
    }
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
    //------------------------------------
    const handleChange = (e) => {
        setValue(e.target.value)
        if (e.target.value === 'nameMaterials') {
            setTable('none')
            setTableMaterial('flex')
            setTableSubMaterial('none')
            setData([])
        } else if (e.target.value === 'nameSubMaterials') {
            setTable('none')
            setTableMaterial('none')
            setTableSubMaterial('flex')
            setData([])
        }
    }
    // console.log(data)
    return (
        <>
            <Typography style={{ marginTop: 30, color: 'white', marginBottom: 25 }} align='center'>BUSQUEDA DE MATERIALES</Typography>
            <Container >
                <Container maxWidth='md'>
                    <form onSubmit={buscar}>
                        <Grid container direction='row' justifyContent='space-around' alignItems='center' style={{ marginBottom: 15 }}>
                            <TextField
                                style={{ background: 'white', borderRadius: 5, width: '50%' }}
                                inputRef={texto}
                                // label='Introdusca'
                                variant='outlined'
                                size='small'
                            />
                            <FormControl>
                                <RadioGroup onChange={handleChange} style={{ flexDirection: 'row', color: 'white' }}>
                                    <FormControlLabel value='nameMaterials' control={<Radio color='primary' style={{ color: 'white' }} />} label='MATERIALES' />
                                    <FormControlLabel value='nameSubMaterials' control={<Radio color='primary' style={{ color: 'white' }} />} label='SUB-MATERIALES' />
                                </RadioGroup>
                            </FormControl>
                            <Button
                                type='submit'
                                // onClick={buscar}
                                variant='contained'
                                style={{
                                    color: 'white',
                                    background: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)'
                                }}
                                endIcon={<SearchIcon />}
                            >Buscar</Button>
                        </Grid>
                    </form>
                </Container>

                <Paper component={Box} p={1} >
                    <div style={{ display: table, height: 400 }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Typography align='center'>Esperando...</Typography>
                        </div>
                    </div>
                    <TableContainer style={{ maxHeight: 450, display: tableMaterial }}>
                        <Table stickyHeader size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: 'white', backgroundColor: "black", borderTopLeftRadius: 5 }}>CODIGO</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>MATERIAL</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black", borderTopRightRadius: 5 }}>ACCIONES</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data.length > 0 ? (
                                        data.map((e, index) => (
                                            <TableRow key={index} className={classes.tableRow}>
                                                <TableCell>{e.codMaterial}</TableCell>
                                                <TableCell>{e.nameMaterial}</TableCell>
                                                <TableCell align='center' style={{ padding: 0, margin: 0 }}>
                                                    <Tooltip title='sub-materiales'>
                                                        <IconButton size='small' onClick={() => irSubMateriales(e)}>
                                                            <TableChartIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            {/* <TableCell align='center' colSpan='3' style={{ display: progress }}>
                                                        <CircularProgress />
                                                    </TableCell> */}
                                            <TableCell colSpan='3' align='center'>no existen datos</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer style={{ maxHeight: 450, display: tableSubMaterial }}>
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
                                                        <IconButton size='small' onClick={() => irTarjeta(e)}>
                                                            <FilterNoneIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title='kardex' >
                                                        <IconButton size='small' onClick={() => irkardex(e)}>
                                                            <CreditCardIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            {/* <TableCell align='center' colSpan='4' style={{ display: progress }}>
                                                        <CircularProgress />
                                                    </TableCell> */}
                                            <TableCell colSpan='4' align='center'>no existen datos</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
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