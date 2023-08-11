import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { Collapse, Snackbar } from '@material-ui/core';

export const ErrorPrintIngresoMat = (props) => {
    return (
        <Collapse in={props.open} >
            <Alert variant="filled" severity="error" onClose={props.setOpen}>
                Error, antes de imprimir inserte datos, no sea idiota!
            </Alert>
        </Collapse>
    )
}
export const ErrorRegisterIngresoMat = (props) => {
    return (
        <Collapse in={props.open} >
            <Alert variant="filled" severity="error" onClose={props.setOpen}>
                Error, No se puede hacer el registro, inserte datos !
            </Alert>
        </Collapse>
    )
}
export const ErrorDuplicidad = (props) => {
    return (
        <Collapse in={props.open} >
            <Alert variant="filled" severity="error" onClose={props.setOpen}>
                Error, La informacion ya fué registrada, por favor elimine los datos para un nuevo registro !
            </Alert>
        </Collapse>
    )
}
export const SuccessRegisterIngresoMat = (props) => {
    return (
        <Collapse in={props.open} >
            <Alert variant="filled" severity="success" onClose={props.setOpen}>
                Success, Datos Registrados Correctamente!
            </Alert>
        </Collapse>
    )
}

// ----------------SALIDA DE MATERIALES--------------------

export const SuccessRegisterSalidaMat = (props) => {
    return (
        <Collapse in={props.open} >
            <Alert variant="filled" severity="success" onClose={props.setOpen}>
                Success, Datos Registrados Correctamente!
            </Alert>
        </Collapse>
    )
}
export const ErrorRegisterSalidaMat = (props) => {
    return (
        <Collapse in={props.open} >
            <Alert variant="filled" severity="error" onClose={props.setOpen}>
                Error, No se pudo registrar!
            </Alert>
        </Collapse>
    )
}

// ------------------ MATERIALES------------------------

export const SuccessAlertsMateriales = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.setOpen}>
            <Alert variant="filled" severity="success" onClose={props.setOpen}>
                Success, La acción de realizó correctamente.
            </Alert>
        </Snackbar>
    )
}
export const ErrorAlertsMateriales = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.setOpen}>
            <Alert variant="filled" severity="error" onClose={props.setOpen}>
                Error, Ocurrio algun problema y no se pudo realizar la acción.
            </Alert>
        </Snackbar>
    )
}


// ------------------SUB- MATERIALES------------------------
export const SuccessAlertsSalidas = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.setOpen}>
            <Alert variant="filled" severity="success" onClose={props.setOpen}>
                Success, La acción de realizó correctamente.
            </Alert>
        </Snackbar>
    )
}
export const ErrorAlertsSalidas = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.setOpen}>
            <Alert variant="filled" severity="error" onClose={props.setOpen}>
                Error, Cantidad o Precio mayor al que se tiene
            </Alert>
        </Snackbar>
    )
}
// ------------------EDIT -SUB- MATERIALES------------------------
export const SuccessAlertsEditSubMaterial = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.setOpen}>
            <Alert variant="filled" severity="success" onClose={props.setOpen}>
                Success, La acción de realizó correctamente.
            </Alert>
        </Snackbar>
    )
}
export const ErrorAlertsEditSubMaterial = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.setOpen}>
            <Alert variant="filled" severity="error" onClose={props.setOpen}>
                Error, No se pudo modificar
            </Alert>
        </Snackbar>
    )
}
//----------------------CIERRE DE CAJA---------------------------
export const SuccessAlertCierreCaja = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.setOpen}>
            <Alert variant="filled" severity="success" onClose={props.setOpen}>
                Success, La acción de realizó correctamente.
            </Alert>
        </Snackbar>
    )
}
export const ErrorAlertCierreCaja = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.setOpen}>
            <Alert variant="filled" severity="error" onClose={props.setOpen}>
                Error, No se pudo realizar la accion.
            </Alert>
        </Snackbar>
    )
}
//---------------------------------------------------------
export const AlertOpcionBusqueda = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.setOpen}>
            <Alert variant="filled" severity="warning" onClose={props.setOpen}>
                Asegurese de elegir una Opcion para comenzar la busqueda.
            </Alert>
        </Snackbar>
    )
}
