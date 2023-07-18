import { Container, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Typography, makeStyles, IconButton } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import InfoIcon from '@material-ui/icons/Info';
import CreditCardIcon from '@material-ui/icons/CreditCard';
const ipcRenderer = window.require('electron').ipcRenderer

const useStyles = makeStyles((theme) => ({
    styleTablehead: {
        color: 'white',
        backgroundColor: "black",
        align: 'center'
    }
}))
const P_01_00X = (props) => {
    const {history}=props
    const classes = useStyles()
    const [getData, setGetData] = useState([])

    useEffect(() => {
        ipcRenderer.send('get-product','01-00X')
        ipcRenderer.on('01-00X',  (e, args) => {
            const product =  JSON.parse(args)
            setGetData(product)

        })
        
    }, [])
    const irTarjeta=(e)=>{
        const id=e._id
        const codigo=e.description
        // console.log(e)
        history.push('/targetaexis/'+id+"/"+codigo)
    }
    console.log(getData)
    return (
        <Container maxWidth={false}>
            <div style={{ paddingLeft: 240 }}>
                <Typography style={{ paddingTop: '5rem' }} variant='h4' align='center'>Reactivos para Flotacion</Typography>
                <Paper>
                    <TableContainer style={{ maxHeight: 440 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.styleTablehead}>01-00X</TableCell>
                                    <TableCell className={classes.styleTablehead}>Nombre</TableCell>
                                    <TableCell className={classes.styleTablehead}>Unidad</TableCell>
                                    <TableCell className={classes.styleTablehead}>Saldo Inicial</TableCell>
                                    <TableCell className={classes.styleTablehead}>Saldo Actual</TableCell>
                                    <TableCell className={classes.styleTablehead}>Precio Unitario</TableCell>
                                    <TableCell className={classes.styleTablehead}>Precio Total</TableCell>
                                    <TableCell className={classes.styleTablehead}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getData&& getData.map(p => (
                                    <TableRow key={p._id} >
                                        <TableCell>{p.cod}</TableCell>
                                        <TableCell>{p.description}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <IconButton size='small' onClick={()=>irTarjeta(p)}>
                                                <InfoIcon />
                                            </IconButton>
                                            <IconButton size='small' style={{marginLeft:'1rem'}}>
                                                <CreditCardIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                {/* <ExamplePDF /> */}
            </div>

        </Container>
    )
}

export default withRouter( P_01_00X)
