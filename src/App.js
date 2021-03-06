import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';


function App() {

 //CITAS EN LOCAL STORAGE
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

 // Arreglo de citas
  let [citas, guardarCitas] = useState(citasIniciales);

 //USEFECT PARA REALIZAR OPERACIONES CUANDO EL STATE CAMBIA
  useEffect( () => {

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }
    else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
    //console.log('listo');

  }, [citas, citasIniciales]);

 // Funcion q tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    //console.log(cita);
    guardarCitas([
      ...citas,
      cita
    ]);
  }

 //Funcion q elimina la cita por su id
  const eliminarCita = id => {
    //console.log(id);
    const nuevaCitas = citas.filter( cita => cita.id !== id );
    guardarCitas(nuevaCitas);
  }

 //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita =>(
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
   
  );
}

export default App;


/*
import logo from './logo.svg';

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
 */