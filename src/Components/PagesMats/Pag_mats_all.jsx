import { Button, Container, Grid,TextField,InputAdornment, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import InfoIcon from '@material-ui/icons/Info';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import sello from '../../images/sello.png'
import SearchIcon from '@material-ui/icons/Search';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
const ipcRenderer = window.require('electron').ipcRenderer

const useStyles = makeStyles((theme) => ({
    styleTablehead: {
        color: 'white',
        backgroundColor: "black",
        align: 'center'
    }
}))

const Pag_mats_all = (props) => {
    const classes = useStyles()
    const { history } = props
    var a = props.location.pathname
    a = a.split('/')
    const [getData, setGetData] = useState([])
    const [tarjeta, setTarjeta] = useState([])

    var array = []
    var dos;
    useEffect(() => {
        // (async () => {
        //     const result = await ipcRenderer.invoke('get-product', a[2])
        //     setGetData(JSON.parse(result))
        //     // console.log(result)
        // })()
        otro()
        mostrar()
    }, [])

    const otro=async()=>{
        try {
            const result = await ipcRenderer.invoke('get-product', a[2])
            setGetData(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
    }
    const mostrar=()=>{
        const mm= ipcRenderer.invoke('get-tarjeta-existencia-saldo-actual', a[2])
        mm.then(resp=>setTarjeta(resp))
        
        // for (var i = 0; i < getData.length; i++) {
        //     const mm=ipcRenderer.invoke('get-tarjeta-existencia-saldo-actual', getData[i].description)
        //     console.log('entra')
        //     var uno=i;
        //     mm.then(resp=>{console.log(resp[0])
                
        //             dos={...getData[uno],...resp[0]}
        //             console.log('hola')
        //             console.log(dos)
        //             array2.push(dos)
        //             console.log(array2)
        //     })
            
        //     // var dos;
        //     // mm.then(resp=>{
        //     //     console.log(resp[0])
        //     //     // dos={...getData[i],...resp[0]},
        //     //     // console.log(dos)
        //     // })
        // }
        // setTarjeta(dos)
    }
    
    for(var j=0;j<getData.length;j++){
        dos= {...getData[j],...tarjeta[j]}
        array.push(dos)
        
    }


    //---------------------------------------------------------------------------
    const goTarjeta = (e) => {
        const id = e._id
        const codigo = e.description
        const typeMaterial = e.typeMat
        const kardex=e.cod
        const saldoI=e.saldoInicial
        const unidadM=e.unidadMedida
        // console.log(e)
        history.push('/targetaexis/' + id + "/" + codigo + "/" + typeMaterial+"/"+kardex+"/"+saldoI+"/"+unidadM)
    }
    const goKardex = (e) => {
        const id = e._id
        const codigo = e.description
        const typeMaterial = e.typeMat
        const kardex=e.cod
        const saldoI=e.saldoInicial
        const unidadM=e.unidadMedida
        history.push('/kardexval/' + id + "/" + codigo + "/" + typeMaterial+"/"+kardex+"/"+saldoI+"/"+unidadM)
    }
    //--------------------------------------PDF GENERATE---------------------------------
    var image=sello
    const pdfGenerate =()=>{
        const doc= new jsPDF()
        document.getElementById('desaparecer').style.display='none'
        doc.text(`Tabla de ${a[3]}`,65,20)
        doc.addImage(image,20,10,30,15)
        doc.autoTable({html:"#id-table", styles: { halign: 'center' }, margin:{top:30}})
        document.getElementById('desaparecer').style.display='revert'
        window.open(doc.output('bloburi'))
    }
    
    //---------------------------BUSCADOR---------------------------------------------
    const [buscador, setBuscador] = useState("")

    const buscarMaterial = (buscador) => {
        return function (x) {
            return x.cod.includes(buscador) ||
                x.description.toLowerCase().includes(buscador) ||
                x.unidadMedida.toLowerCase().includes(buscador) ||
                x.description.includes(buscador) ||
                x.unidadMedida.includes(buscador) ||
                !buscador

        }
    }
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    // console.log(getData)
    // console.log(tarjeta)
    // console.log(array)

    return (
        <Container maxWidth={false}>
            <div style={{ paddingLeft: 240 }}>
                <Typography style={{ paddingTop: '5rem', marginBottom:'2rem' }} variant='h4' align='center'>{a[3]}</Typography>
                <Grid container spacing={3} style={{marginBottom:'0.5rem'}}>
                    <Grid item xs={12} sm={6}>
                        <Paper>
                            {array &&
                                <TextField
                                // style={{width:'100%'}}
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <>
                                            <Typography variant='subtitle1' style={{ marginRight: '0.5rem' }}>Buscar</Typography>
                                            <InputAdornment position='start'>
                                                <SearchIcon />
                                            </InputAdornment>

                                        </>
                                    )
                                }}
                                onChange={e => setBuscador(e.target.value)}
                            />
                            }
                        </Paper>
                    </Grid>
                    <Grid container item xs={12} sm={6} justifyContent='flex-end'>
                        <Button size='small' variant='contained' color='primary' onClick={pdfGenerate}>imprimir</Button>
                    </Grid>
                </Grid>
                <Paper>
                    <TableContainer style={{ maxHeight: 440 }}>
                        <Table stickyHeader id='id-table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.styleTablehead}>{a[2]}</TableCell>
                                    <TableCell className={classes.styleTablehead}>Nombre</TableCell>
                                    <TableCell className={classes.styleTablehead}>Unidad</TableCell>
                                    <TableCell className={classes.styleTablehead}>Saldo Inicial</TableCell>
                                    <TableCell className={classes.styleTablehead}>Saldo Actual</TableCell>
                                    <TableCell className={classes.styleTablehead}>Precio Total</TableCell>
                                    <TableCell className={classes.styleTablehead}>Precio Unitario</TableCell>
                                    <TableCell id='desaparecer' className={classes.styleTablehead}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {array.length > 0 ? (array.filter(buscarMaterial(buscador)).map(p => (
                                    <TableRow key={p._id} >
                                        <TableCell>{p.cod}</TableCell>
                                        <TableCell>{p.description}</TableCell>
                                        <TableCell>{p.unidadMedida}</TableCell>
                                        <TableCell>{p.saldoInicial}</TableCell>
                                        <TableCell>{p.saldoActual}</TableCell>
                                        <TableCell>{p.precioTotal}</TableCell>
                                        <TableCell>{p.precioUnitario}</TableCell>
                                        <TableCell>
                                            <Tooltip title='tarjeta'>
                                                <IconButton size='small' onClick={() => goTarjeta(p)}>
                                                    <InfoIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title='kardex'>
                                                <IconButton size='small' style={{ marginLeft: '1rem' }} onClick={() => goKardex(p)}>
                                                    <CreditCardIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))) : (
                                    <TableRow>
                                        <TableCell colSpan='7' align='center'>No se encuentran Datos</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                {/* <ExamplePDF /> */}
            </div>

        </Container>
    )
}

export default withRouter(Pag_mats_all)
