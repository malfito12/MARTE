import { IconButton, styled , Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import MuiAppBar from '@material-ui/core/AppBar'
import UnidadMedida from '../Pages2/Registros/UnidadMedida'

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${240}px)`,
            marginLeft: `${240}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    })
)
const MainAppBar = (props) => {
    // console.log(props.openDrawer)

    return (
        <>
        <AppBar position='fixed' open={props.open} color='transparent'>
            <Toolbar>
                <IconButton
                    // color='default'
                    aria-label='menu'
                    edge='start'
                    onClick={props.openDrawer}
                    style={{ ...(props.open && { display: 'none' }) }}
                >
                    <MenuIcon style={{ color: 'white' }} />
                </IconButton>
                <Typography style={{ color: 'white', flexGrow: 1 }}>Menu</Typography>
                <UnidadMedida />
            </Toolbar>
        </AppBar>
        {/* -------------------------------------------------- */}
        </>
    )
}

export default MainAppBar