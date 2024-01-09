import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, styled } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from '../Pages/Home'
import ListaProduct from '../Pages2/Vistas/ListaProduct';
import ListaSubmateriales from '../Pages2/Vistas/ListaSubmateriales';
import IngresoMateriales from '../Pages2/Registros/IngresoMateriales';
import SalidaMateriales from '../Pages2/Registros/SalidaMateriales';
import ListaAlmacen from '../Pages2/Almacen/ListaAlmacen';
import HojaCostos from '../Pages2/Costos/HojaCostos';
import TarjetaExistencia from '../Pages2/Vistas/TarjetaExistencia';
import KardexValorado from '../Pages2/Vistas/KardexValorado';
import ListaIngresoAlmacen from '../Pages2/Almacen/ListaIngresoAlmacen';
import ListaSalidaAlmacen from '../Pages2/Almacen/ListaSalidaAlmacen';
import Busqueda from '../Pages2/Costos/Busqueda';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import StoreIcon from '@material-ui/icons/Store';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import HttpsIcon from '@material-ui/icons/Https';
import Cierre from '../Pages2/Costos/Cierre';
import BusquedaCierre from '../Pages2/Costos/BusquedaCierre';

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: 240,
        background: '#141e30'
    },
}))
export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(4.5),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 240,
        }),
    }),
);


const NewDrawer = (props) => {
    const classes = useStyles()
    return (
        <div>
            <Drawer
                open={props.openDrawer}
                onClose={props.closeDrawer}
                anchor='left'
                variant='persistent'
                classes={{ paper: classes.drawerPaper }}
                style={{ flexShrink: 0 }}
            >
                <div align='right'>
                    <IconButton onClick={props.closeDrawer} >
                        <ChevronLeftIcon style={{ color: 'white' }} />
                    </IconButton>
                </div>
                <Divider />
                <List component='nav'>
                    {/* <ListItem button component={Link} to='/' style={{ color: 'yellowgreen' }}>
                        <ListItemIcon >
                            <ArrowRightAltIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText>Inicio</ListItemText>
                    </ListItem> */}
                    <ListItem button component={Link} to='/listaProduct' style={{ color: 'yellowgreen' }}>
                        <ListItemIcon>
                            <FeaturedPlayListIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText>Lista de Productos</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to='/ingresoMateriales' style={{ color: 'yellowgreen' }}>
                        <ListItemIcon>
                            <LocalPharmacyIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText>Ingreso de Materiales</ListItemText>
                    </ListItem>
                    {/* <ListItem button component={Link} to='/salidaMateriales' style={{ color: 'yellowgreen' }}>
                        <ListItemIcon>
                            <ArrowRightAltIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText>Salida de Materiales</ListItemText>
                    </ListItem> */}
                    <ListItem button component={Link} to='/listaAlmacen' style={{ color: 'yellowgreen' }}>
                        <ListItemIcon>
                            <StoreIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText>Almacén</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to='/hojaCostos' style={{ color: 'yellowgreen' }}>
                        <ListItemIcon>
                            <LocalAtmIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText>Hoja de Costos</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to='/busqueda' style={{ color: 'yellowgreen' }}>
                        <ListItemIcon>
                            <FindInPageIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText>Busqueda</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to='/busqueda-cierre' style={{ color: 'yellowgreen' }}>
                        <ListItemIcon>
                            <HttpsIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText>Cierre de Mes</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <Main open={props.openDrawer}>
                <Route path='/' exact component={Home}/>
                <Route path='/listaProduct' exact component={ListaProduct} />
                <Route path='/listaSubmateriales/:id'  component={ListaSubmateriales} />
                <Route path='/ingresoMateriales' exact component={IngresoMateriales} />
                {/* <Route path='/salidaMateriales' exact component={SalidaMateriales} /> */}
                <Route path='/tarjetaExistencia/:id' component={TarjetaExistencia} />
                <Route path='/kardexValorado/:id' component={KardexValorado} />
                <Route path='/listaAlmacen' exact component={ListaAlmacen} />
                <Route path='/listaIngresoAlmacen'  component={ListaIngresoAlmacen} />
                <Route path='/listaSalidaAlmacen'  component={ListaSalidaAlmacen} />
                <Route path='/hojaCostos' exact component={HojaCostos} />
                <Route path='/busqueda' exact component={Busqueda} />
                <Route path='/cierremes' exact component={Cierre} />
                <Route path='/busqueda-cierre' exact component={BusquedaCierre} />
            </Main>
        </div>
    )
}

export default NewDrawer