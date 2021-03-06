import React, { Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';



const Formulario = ({ crearCita }) => {

  // Crear State de Citas
    const [ cita, actualizarCita ] = useState({

        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

  //Agregamos un segundo State que maneje errores del submitCita
    const [ error, actualizarError ] = useState(false)


  // Funcion q se ejecuta cada vez q el usuario escribe en un input
    const actualizarState = e => {
        //console.log(e.target.name, 'escribiendo...');
        actualizarCita({

            ...cita,
            [e.target.name]: e.target.value
        })
        
    };

  // Extraer valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando el usuario presiona agregar cita
    const submitCita = e => {

        //alert('Enviando');

        e.preventDefault(); //prevenior la accion por default de enviar info por query string por el metodo get http://localhost:3000/?mascota=pegui&propietario=aldo&fecha=&hora=&sintomas=
        //console.log('enviando form'); //podemos ver q ya no lo hace


      // Validar
        
        //console.log(mascota)
        if( //trim permite eliminar espacios al principio y al final
               mascota.trim() === '' 
            || propietario.trim() === '' 
            || fecha.trim() === '' 
            || hora.trim() === '' 
            || sintomas.trim() === ''
        ){ 

            //console.log("Hay un error")
            actualizarError(true);
            return;
        }

      // Eliminar mensaje de error previo
        actualizarError(false);

      // Asignar un ID
        //vamos a instalar npm i uuid en citas o npm i shortid, luego importamos la q instalemos
        cita.id = uuid();
        //console.log(cita);

      // Crear la cita

         crearCita(cita);

      // Reiniciar el form

        actualizarCita({

            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });

    }


    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error" >Todos los campos son obligatorios</p>: null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                   type="text"
                   name="mascota"
                   className="u-full-width"
                   placeholder="Nombre Mascota"
                   onChange={actualizarState}
                   value={mascota}
                />

                <label>Nombre Due??o</label>
                <input
                   type="text"
                   name="propietario"
                   className="u-full-width"
                   placeholder="Nombre Due??o de la mascota"
                   onChange={actualizarState}
                   value={propietario}
                />

                <label>Fecha</label>
                <input
                   type="date"
                   name="fecha"
                   className="u-full-width"
                   onChange={actualizarState}
                   value={fecha}
                />

                <label>Hora</label>
                <input
                   type="time"
                   name="hora"
                   className="u-full-width"
                   onChange={actualizarState}
                   value={hora}
                />

                <label>S??ntomas</label>
                <textarea
                   name="sintomas"
                   className="u-full-width"
                   onChange={actualizarState}
                   value={sintomas}
                ></textarea>

                <button
                   type="submit"
                   className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}

// Tipe Chesking
Formulario.propTypes = {

    crearCita: PropTypes.func.isRequired,
}
 
export default Formulario;