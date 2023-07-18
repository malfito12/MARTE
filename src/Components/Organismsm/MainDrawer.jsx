import React, { useState } from 'react'
import MainAppBar from './MainAppBar'
import NewDrawer from './NewDrawer'

const MainDrawer = () => {
    const [open,setOpen]=useState(false)
    const openDrawer=()=>{
        setOpen(true)
    }
    const closeDrawer=()=>{
        setOpen(false)
    }
  return (
    <>
        <MainAppBar openDrawer={openDrawer} open={open} />
        <NewDrawer closeDrawer={closeDrawer} openDrawer={open}  />
    </>
  )
}

export default MainDrawer