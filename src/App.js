import React from 'react'
import './index.css'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
// import DrawerPrincipal from './Components/Organismsm/DrawerPrincipal';
// import Home from './Components/Pages/Home';
// import Pag_mats_all from './Components/PagesMats/Pag_mats_all';
// import P_01_00X from './Components/PagesMats/P_01_00X';
// import RegisterProduct from './Components/Pages2/Registros/RegisterMaterial';
// import ListaProduct from './Components/Pages2/Vistas/ListaProduct';
// import ListaSubmateriales from './Components/Pages2/Vistas/ListaSubmateriales';
// import IngresoMateriales from './Components/Pages2/Registros/IngresoMateriales';
// import SalidaMateriales from './Components/Pages2/Registros/SalidaMateriales';
// import TarjetaExistencia from './Components/Pages2/Vistas/TarjetaExistencia';
// import KardexValorado from './Components/Pages2/Vistas/KardexValorado';
// import ListaAlmacen from './Components/Pages2/Almacen/ListaAlmacen';
// import ListaIngresoAlmacen from './Components/Pages2/Almacen/ListaIngresoAlmacen';
// import ListaSalidaAlmacen from './Components/Pages2/Almacen/ListaSalidaAlmacen';
// import HojaCostos from './Components/Pages2/Costos/HojaCostos';
// import NewDrawer from './Components/Organismsm/NewDrawer';
import MainDrawer from './Components/Organismsm/MainDrawer';

function App() {
  return (
    <div id="main">
      <Router>
        {/* <DrawerPrincipal /> */}
        <MainDrawer />
        {/* <NewDrawer /> */}
        <Switch>
          {/* <Route path='/' exact component={Home} /> */}

          {/*--------------------------------------NUEVAS PAGINAS--------------------------------*/}
          {/* <Route path='/listaProduct' component={ListaProduct} />
          <Route path='/listaSubmateriales/:id' component={ListaSubmateriales} />
          <Route path='/ingresoMateriales' component={IngresoMateriales} />
          <Route path='/salidaMateriales' component={SalidaMateriales} />
          <Route path='/tarjetaExistencia/:id' component={TarjetaExistencia} />
          <Route path='/kardexValorado/:id' component={KardexValorado} />
          <Route path='/listaAlmacen' component={ListaAlmacen} />
          <Route path='/listaIngresoAlmacen' component={ListaIngresoAlmacen} />
          <Route path='/listaSalidaAlmacen' component={ListaSalidaAlmacen} />
          <Route path='/hojaCostos' component={HojaCostos} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
