import { Backdrop, Box, Button, CircularProgress, Dialog, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography, makeStyles } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ErrorAlertCierreCaja, SuccessAlertCierreCaja } from '../../Atoms/Alerts/Alerts'

const ipcRenderer = window.require('electron').ipcRenderer

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '0.5rem'
    },
    spacingPaper: {
        marginBottom: '1rem',
        padding: 0
    },
    tableRow: {
        "&:hover": {
            backgroundColor: "#bbdefb"
        }
    },
    tableCellspcing: {
        paddingTop: 0,
        paddingBottom: 0
    },
    tableCellBody: {
        // fontSize: 'small',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
}))

const Cierre = () => {
    const classes = useStyles()
    const [cierre, setCierre] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalCierre, setModalCierre] = useState(false)
    const [postDataCierre, setPostDataCierre] = useState(false)
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false)
    const [openAlertError, setOpenAlertError] = useState(false)
    const [dataCierre, setDataCierre] = useState({ nameMaterial: '', contenido: [] })
    // useEffect(() => {
    //     getCierre()
    // }, [])

    const meses = [
        { id: 1, name: 'ENERO' },
        { id: 2, name: 'FEBRERO' },
        { id: 3, name: 'MARZO' },
        { id: 4, name: 'ABRIL' },
        { id: 5, name: 'MAYO' },
        { id: 6, name: 'JUNIO' },
        { id: 7, name: 'JULIO' },
        { id: 8, name: 'AGOSTO' },
        { id: 9, name: 'SEPTIEMBRE' },
        { id: 10, name: 'OCTUBRE' },
        { id: 11, name: 'NOVIEMBRE' },
        { id: 12, name: 'DICIEMBRE' },
    ]

    const anio = useRef()
    const mes = useRef()
    const openModalCierre = (e) => {
        setPostDataCierre(e)
        setModalCierre(true)
    }
    const closeModalCierre = () => {
        setModalCierre(false)
    }
    //----------------------------------------------------
    const openCloseAlertSuccess = () => {
        setOpenAlertSuccess(!openAlertSuccess)
    }
    const openCloseAlertError = () => {
        setOpenAlertError(!openAlertError)
    }
    //----------------------------------------------------
    const postCierre = async (e) => {
        e.preventDefault()
        const data = {
            mes: mes.current.value,
            anio: anio.current.value,
            totalEntrada: sumE,
            totalSalida: sumS,
            total: sumTotal,
            contenido: postDataCierre
        }
        // console.log(data)
        await ipcRenderer.invoke('post-cierre-mes', data)
            .then(resp => {
                // console.log(resp)
                openCloseAlertSuccess()
                // alert(resp.message)
                closeModalCierre()
            })
            .catch(err => {
                openCloseAlertError()
                console.log(err)
            })

    }
    const openModalData = (e) => {
        console.log(e)
        setDataCierre(e)
        setOpenModal(true)
    }
    const closeModalData = () => {
        setOpenModal(false)
    }
    //-----------------------------------------------------------------
    var sumTotal = 0
    var sumE = 0
    var sumS = 0
    for (var i = 0; i < cierre.length; i++) {
        sumTotal = sumTotal + parseFloat(cierre[i].total)
        parseFloat(cierre[i].total) >= 0 ? sumE = sumE + parseFloat(cierre[i].total) : sumS = sumS + parseFloat(cierre[i].total)
    }
    //-----------------------------------------------------------------
    const fechaini = useRef()
    const fechafin = useRef()

    //---------------LOADING------------
    const openLoading = () => {
        setLoading(true)
    }
    const closeLoading = () => {
        setLoading(false)
    }
    //----------------------------------------------
    const buscar = async (e) => {
        e.preventDefault()
        const data = {
            fechaIni: fechaini.current.value,
            fechaFin: fechafin.current.value,
        }
        openLoading()
        await ipcRenderer.invoke('search-cierre-mes', data)
            .then(resp => {
                setCierre(JSON.parse(resp))
                closeLoading()
            })
            .catch(err => console.log(err))
    }
    // console.log(cierre)
    return (
        <>
            <div style={{ marginTop: 50 }}>
                <Button
                    size='small'
                    style={{
                        color: 'white',
                        background: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)',
                        marginRight: '1rem',
                    }}
                    variant='contained'
                    component={Link}
                    to='/busqueda-cierre'
                >Lista mes</Button>
                <Button
                    size='small'
                    style={{
                        color: 'white',
                        background: 'linear-gradient(45deg, #d84315 30%, #ff7043 90%)',
                    }}
                    variant='contained'
                    component={Link}
                    to='/cierremes'
                >Cierre de mes</Button>
            </div>
            <Typography align='center' variant='h6' style={{ paddingTop: 10, marginBottom: '1rem', color: 'white' }}>CIERRE DE MES</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <Paper component={Box} p={2}>
                        <form onSubmit={buscar}>
                            <Typography align='center'>Buscar Fechas</Typography>
                            <TextField
                                label='Fecha de Inicio'
                                variant='outlined'
                                fullWidth
                                size='small'
                                type='date'
                                InputLabelProps={{ shrink: true }}
                                style={{ marginBottom: 10 }}
                                inputRef={fechaini}
                                required
                            />
                            <TextField
                                label='Fecha Fin'
                                variant='outlined'
                                fullWidth
                                size='small'
                                type='date'
                                InputLabelProps={{ shrink: true }}
                                style={{ marginBottom: 10 }}
                                inputRef={fechafin}
                                required
                            />
                            <Button type='submit' variant='outlined' style={{ background: 'green', color: 'white' }} size='small' fullWidth>Buscar</Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Paper component={Box} p={1}>
                        <TableContainer style={{ maxHeight: 550 }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>N°</TableCell>
                                        <TableCell>Code</TableCell>
                                        <TableCell>Nombre de Producto</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cierre.length > 0 ? (
                                        cierre.map((e, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{e.codeMaterial}</TableCell>
                                                <TableCell>{e.nameMaterial}</TableCell>
                                                <TableCell>{e.total}</TableCell>
                                                <TableCell>
                                                    <Button variant='contained' size='small' style={{ background: 'green', color: 'white' }} onClick={() => openModalData(e)}>informacion</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : null}
                                </TableBody>
                                <TableFooter>
                                    {cierre.length > 0 ? (
                                        <>
                                            <TableRow>
                                                <TableCell>Total</TableCell>
                                                <TableCell colSpan={2} align='right'>{sumTotal}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={4} align='right'>
                                                    <Button onClick={() => openModalCierre(cierre)} variant='outlined' size='small' style={{ background: 'green', color: 'white' }}>Guardar informacion de mes</Button>
                                                </TableCell>

                                            </TableRow>
                                        </>
                                    ) : null}
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
            {/* <Paper component={Box} p={2}>
                <TableContainer style={{ maxHeight: 430 }}>
                    <Table stickyHeader size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: 'white', backgroundColor: "black" }}>Año</TableCell>
                                <TableCell style={{ color: 'white', backgroundColor: "black" }}>Mes</TableCell>
                                <TableCell style={{ color: 'white', backgroundColor: "black" }}>Total Entrada</TableCell>
                                <TableCell style={{ color: 'white', backgroundColor: "black" }}>Total Salida</TableCell>
                                <TableCell style={{ color: 'white', backgroundColor: "black" }}>Total</TableCell>
                                <TableCell style={{ color: 'white', backgroundColor: "black" }}>Informacion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cierre.length > 0 ? (
                                cierre.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((e, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{e.anio}</TableCell>
                                        <TableCell>{e.mes}</TableCell>
                                        <TableCell>{e.totalEntrada}</TableCell>
                                        <TableCell>{e.totalSalida}</TableCell>
                                        <TableCell>{e.total}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => openModalData(e.data)} size='small' style={{ background: 'yellow' }} variant='contained'>informacion</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 50, 100, 200, 500, 1000]}
                    component="div"
                    count={cierre.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    // onChangePage={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                // onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper> */}
            {/*--------------------------------------------------------------------*/}
            <Dialog
                open={openModal}
                onClose={closeModalData}
                maxWidth='lg'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center'>{dataCierre.nameMaterial}</Typography>
                    <TableContainer style={{ maxHeight: 550 }}>
                        <Paper component={Box} p={0.3}>
                            <TableContainer style={{ maxHeight: 430 }}>
                                <Table id='id-table' size='small' style={{ minWidth: 1000 }} >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell rowSpan={2} style={{ color: 'white', backgroundColor: "black" }}>Code</TableCell>
                                            <TableCell rowSpan={2} style={{ color: 'white', backgroundColor: "black" }}>Nombre</TableCell>
                                            <TableCell colSpan={3} align='center'>INGRESOS DEL MES</TableCell>
                                            <TableCell colSpan={3} align='center'>SALIDAS DEL MES</TableCell>
                                            <TableCell colSpan={3} align='center'>SALDOS DEL MES</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ background: 'red' }} align='center'>Unidades</TableCell>
                                            <TableCell style={{ background: 'red' }} align='center'>Precio Unitario</TableCell>
                                            <TableCell style={{ background: 'red' }} align='center'>Total</TableCell>
                                            <TableCell style={{ background: 'blue' }} align='center'>Unidades</TableCell>
                                            <TableCell style={{ background: 'blue' }} align='center'>Precio Unitario</TableCell>
                                            <TableCell style={{ background: 'blue' }} align='center'>Total</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black", }} align='center'>Unidades</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black", }} align='center'>Precio Unitario</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black", }} align='center'>Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataCierre ? (
                                            dataCierre.contenido.map((a, index) => (
                                                <TableRow key={index} className={classes.tableRow}>
                                                    <TableCell className={classes.tableCellBody}>{a.codeSubMaterial}</TableCell>
                                                    <TableCell className={classes.tableCellBody}>{a.nameSubMaterial}</TableCell>
                                                    <TableCell className={classes.tableCellBody}>{a.cantidadE}</TableCell>
                                                    <TableCell className={classes.tableCellBody}>{a.precioUniE}</TableCell>
                                                    <TableCell className={classes.tableCellBody}>{a.sumE}</TableCell>
                                                    <TableCell className={classes.tableCellBody}>{a.cantidadS}</TableCell>
                                                    <TableCell className={classes.tableCellBody}>{a.precioUniS}</TableCell>
                                                    <TableCell className={classes.tableCellBody}>{a.sumS}</TableCell>
                                                    <TableCell className={classes.tableCellBody}>{a.cantidad}</TableCell>
                                                    <TableCell className={classes.tableCellBody}>{a.precioUnit}</TableCell>
                                                    <TableCell className={classes.tableCellBody}>{a.precio}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (null
                                            // <TableRow>
                                            //     <TableCell align='center' colSpan='7' >no existen datos</TableCell>
                                            // </TableRow>
                                            // <TableRow>
                                            //     <TableCell align='center' colSpan='7' style={{ display: progress }}>
                                            //         <CircularProgress />
                                            //     </TableCell>
                                            //     <TableCell style={{ display: exist }} colSpan='7' align='center'>no existen datos</TableCell>
                                            // </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Total Entradas:</TableCell>
                                            <TableCell colSpan={2} align='right'>{dataCierre.totalE}</TableCell>
                                            <TableCell>Total Salidas:</TableCell>
                                            <TableCell colSpan={2} align='right'>{dataCierre.totalS}</TableCell>
                                            <TableCell>Total:</TableCell>
                                            <TableCell colSpan={2} align='right'>{dataCierre.total}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TableContainer>
                </Paper>
            </Dialog>
            <Backdrop className={classes.backdrop} open={loading} onClick={closeLoading}>
                <CircularProgress />
            </Backdrop>
            <Dialog
                open={modalCierre}
                onClose={closeModalCierre}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center'>CIERRE DE MES</Typography>
                    <div style={{ margin: 20 }}>
                        <Typography variant='h6'>Total Entradas: {sumE} Bs.</Typography>
                        <Typography variant='h6'>Total Salidas: {sumS} Bs.</Typography>
                        <Typography variant='h6'>Total: {sumTotal} Bs.</Typography>
                    </div>
                    <form onSubmit={postCierre}>
                        <TextField
                            label='Mes de Registro'
                            variant='outlined'
                            size='small'
                            fullWidth
                            defaultValue=''
                            style={{ padding: 2, marginBottom: 10 }}
                            inputRef={mes}
                            required
                            select
                        >
                            {meses && meses.map(e => (
                                <MenuItem key={e.id} value={e.name}>{e.name}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label='Año de Registro'
                            variant='outlined'
                            size='small'
                            fullWidth
                            type='number'
                            style={{ padding: 2, marginBottom: 10 }}
                            inputRef={anio}
                            required
                        />
                        <Button type='submit' variant='outlined' style={{ background: 'green', color: 'white' }} size='small' fullWidth>Guardar</Button>
                    </form>
                </Paper>
            </Dialog>

            {/* ----------------------------------------------------------- */}
            <SuccessAlertCierreCaja open={openAlertSuccess} setOpen={openCloseAlertSuccess} />
            <ErrorAlertCierreCaja open={openAlertSuccess} setOpen={openCloseAlertSuccess} />
        </>
    )
}

export default Cierre
