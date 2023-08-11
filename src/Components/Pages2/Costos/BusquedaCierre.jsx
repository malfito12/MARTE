import { Box, Button, Container, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, emphasize, makeStyles, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const ipcRenderer = window.require('electron').ipcRenderer

const useStyles = makeStyles((theme) => ({
    tableCellBody: {
        // fontSize: 'small',
    },
}))


const BusquedaCierre = () => {
    const classes = useStyles()
    const [cierre, setCierre] = useState([])
    const [modalCierre, setModalCierre] = useState(false)
    const [data, setData] = useState([])
    const [modalSubCierre,setModalSubCierre]=useState(false)
    const [subData, setSubData] = useState([])
    useEffect(() => {
        getCierres()
    }, [])
    //--------------------------------------------
    const openModalCierre = (e) => {
        setData(e)
        setModalCierre(true)
    }
    const closeModalCierre = () => {
        setModalCierre(false)
    }
    //--------------------------------------------
    const openModalSubData=(e)=>{
        setSubData(e)
        setModalSubCierre(true)
    }
    // console.log(subData)
    const closeModalSubData=()=>{
        setModalSubCierre(false)
    }
    //--------------------------------------------
    const getCierres = async () => {
        await ipcRenderer.invoke('get-cierre-mes')
            .then(resp => setCierre(JSON.parse(resp)))
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
            <Container style={{ marginTop: 30 }}>
                <Paper component={Box} p={1}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Año</TableCell>
                                    <TableCell>Mes</TableCell>
                                    <TableCell>Total Entradas</TableCell>
                                    <TableCell>Total Salidas</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>infofrmacion</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cierre.length > 0 ? (
                                    cierre.map((e, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{e.anio}</TableCell>
                                            <TableCell>{e.mes}</TableCell>
                                            <TableCell>{e.totalEntrada}</TableCell>
                                            <TableCell>{e.totalSalida}</TableCell>
                                            <TableCell>{e.total}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => openModalCierre(e.contenido)} variant='outlined' size='small' style={{ background: 'green', color: 'white' }}>informacion</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>

            <Dialog
                open={modalCierre}
                onClose={closeModalCierre}
                maxWidth='lg'
            >
                <Paper component={Box} p={1}>
                    <TableContainer style={{ maxHeight: 550 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>N°</TableCell>
                                    <TableCell>Nombre de Producto</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.length>0 ? (
                                    data.map((e, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{e.nameMaterial}</TableCell>
                                            <TableCell>{e.total}</TableCell>
                                            <TableCell>
                                                <Button variant='contained' size='small' style={{ background: 'green', color: 'white' }} onClick={() => openModalSubData(e.contenido)}>informacion</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : null}
                            </TableBody>
                            {/* <TableFooter>
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
                            </TableFooter> */}
                        </Table>
                    </TableContainer>
                </Paper>
            </Dialog>
            <Dialog
                open={modalSubCierre}
                onClose={closeModalSubData}
                maxWidth='lg'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center'>{cierre.nameMaterial}</Typography>
                    <TableContainer style={{ maxHeight: 550 }}>
                        <Paper component={Box} p={0.3}>
                            <TableContainer style={{ maxHeight: 430 }}>
                                <Table id='id-table' size='small' style={{ minWidth: 1000 }} >
                                    <TableHead>
                                        <TableRow>
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
                                        {subData.length>0 ? (
                                            subData.map((a, index) => (
                                                <TableRow key={index} className={classes.tableRow}>
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
                                        ) : (null)}
                                    </TableBody>
                                    {/* <TableFooter>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Total Entradas:</TableCell>
                                            <TableCell colSpan={2} align='right'>{dataCierre.totalE}</TableCell>
                                            <TableCell>Total Salidas:</TableCell>
                                            <TableCell colSpan={2} align='right'>{dataCierre.totalS}</TableCell>
                                            <TableCell>Total:</TableCell>
                                            <TableCell colSpan={2} align='right'>{dataCierre.total}</TableCell>
                                        </TableRow>
                                    </TableFooter> */}
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TableContainer>
                </Paper>
            </Dialog>
        </>
    )
}

export default BusquedaCierre
