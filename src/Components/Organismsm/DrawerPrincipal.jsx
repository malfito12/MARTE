import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import React from 'react'
import {Link} from 'react-router-dom'
import AppBarPrincipal from './AppBarPrincipal'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Imagen1 from '../../images/Imagen1.png'

const drawerWidth=240
const useStyles=makeStyles((theme)=>({
    drawer:{
        width:drawerWidth,
        flexShrink:0
    },
    drawerPaper:{
        width:drawerWidth,
        background: '#141e30'
    },
    toolbar:theme.mixins.toolbar,
    tamano:{
        fontSize:'10pt'
    }
}))
const DrawerPrincipal = () => {
    const classes=useStyles()
    return (
        <>
        <AppBarPrincipal />
        <Drawer 
        className={classes.drawer} 
        classes={{paper:classes.drawerPaper}}
        variant='permanent'
        anchor='left'
        >
            <div className={classes.toolbar}>
                <img src={Imagen1} style={{ width: 60, height:48,marginLeft:'5rem',paddingTop:'0.5rem' }} alt="#" />
            </div>
            <Divider />
            <List component='nav'>
                <ListItem button component={Link} to='/' style={{color:'yellowgreen'}}>
                    <ListItemIcon >
                        <ArrowRightAltIcon style={{color:'white'}}/>
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Principal</span></ListItemText>
                </ListItem>
                {/* <ListItem button component={Link} to='/productsList' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Lista de Productos</span></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/register' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Registro de Producto</span></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/ingresomat' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Ingreso de Materiales</span></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/salidamat' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Salida de Materiales</span></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/ingresosalmacen' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Almacén</span></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/imagenes' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Imaneges</span></ListItemText>
                </ListItem> */}
                <ListItem button component={Link} to='/listaProduct' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Lista de Productos</span></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/ingresoMateriales' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Ingreso de Materiales</span></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/salidaMateriales' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Salida de Materiales</span></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/listaAlmacen' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Almacén</span></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/hojaCostos' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Hoja de Costos</span></ListItemText>
                </ListItem>
                {/* <ListItem button component={Link} to='/targetaexis' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Targeta de Existencia</span></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/kardexval' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Kardex Valorado</span></ListItemText>
                </ListItem> */}
            </List>
        </Drawer>
        </>
    )
}

export default DrawerPrincipal
