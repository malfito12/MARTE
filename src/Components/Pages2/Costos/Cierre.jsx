import { Box, Button, Dialog, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

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
    }
}))

const Cierre = () => {
    const classes = useStyles()
    const [cierre, setCierre] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [dataCierre, setDataCierre] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    useEffect(() => {
        getCierre()
    }, [])

    const getCierre = async () => {
        try {
            await ipcRenderer.invoke('get-cierre-mes')
                .then(resp => {
                    setCierre(JSON.parse(resp))
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
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
    const handleChangePage = (event, newPage) => {

        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };
    return (
        <>
            <Typography align='center' variant='h6' style={{ paddingTop: '2rem', marginBottom: '1rem', color: 'white' }}>CIERRE DE MES</Typography>
            <Paper component={Box} p={2}>
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
            </Paper>
            {/*--------------------------------------------------------------------*/}
            <Dialog
                open={openModal}
                onClose={closeModalData}
                maxWidth='lg'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center'>Datos de mes</Typography>
                    <TableContainer style={{ maxHeight: 550 }}>
                        <Paper component={Box} p={0.3}>
                            <TableContainer style={{ maxHeight: 430 }}>
                                <Table id='id-table' stickyHeader size='small' style={{ minWidth: 1000 }} >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ color: 'white', backgroundColor: "black", width: '11%' }}>Fecha</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black", width: '3%' }}>Tipo de Registro</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black", width: '3%' }}>Cod. Movimiento</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black", width: '37%' }}>Descripcion</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black", width: '5%' }}>Cantidad</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black", width: '5%' }}>Precio Unitario</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black", width: '5%' }}>Precio</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black", width: '10%' }}>Unidad de Medida</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black", width: '10%' }}>Kardex</TableCell>
                                            {/* <TableCell id='desaparecer' style={{ color: 'white', backgroundColor: "black", width: '10%' }}></TableCell> */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataCierre.length > 0 ? (
                                            dataCierre.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((a, index) => (
                                                // almacen.filter(buscarMaterialAlmacen(buscador)).map((a, index) => (
                                                <TableRow key={index} className={classes.tableRow}>
                                                    <TableCell className={classes.tableCellBody}>{a.registerDate}</TableCell>
                                                    <TableCell className={classes.tableCellBody}>{a.typeRegister}</TableCell>
                                                    {a.typeRegister == 'salida' ? (
                                                        <TableCell className={{ ...classes.tableCellspcing, ...classes.tableCellBody }}>{a.numVale}</TableCell>
                                                    ) : (
                                                        <TableCell className={{ ...classes.tableCellspcing, ...classes.tableCellBody }}>{a.numeroIngreso}</TableCell>
                                                    )}
                                                    <TableCell className={classes.tableCellBody}>{a.nameSubMaterial}</TableCell>
                                                    <TableCell align='right' className={classes.tableCellBody}>{a.cantidad}</TableCell>
                                                    <TableCell align='right' className={classes.tableCellBody}>{a.precioUnitario}</TableCell>
                                                    <TableCell align='right' className={classes.tableCellBody}>{a.precio}</TableCell>
                                                    <TableCell className={classes.tableCellBody}>{a.unidadMedida}</TableCell>
                                                    <TableCell className={classes.tableCellBody}>{a.codSubMaterial}</TableCell>
                                                    {/* <TableCell style={{ padding: 0, margin: 0 }}>
                                                        <Grid container direction='row' justifyContent='space-evenly'>
                                                            <Tooltip title='edit'>
                                                                <IconButton size='small' style={{ color: 'green' }} onClick={() => openModalEdit(a)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title='delete'>
                                                                <IconButton size='small' style={{ color: 'red' }} onClick={() => openModalDelete(a)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    </TableCell> */}
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
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 50, 100, 200, 500, 1000]}
                                component="div"
                                count={dataCierre.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                // onChangePage={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            // onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </TableContainer>
                </Paper>
            </Dialog>
        </>
    )
}

export default Cierre
