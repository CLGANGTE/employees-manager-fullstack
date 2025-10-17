import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
//implementacion de bootstrap para una interfaz responsive
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'

function App() {

//inicializacion de las variables
const[nombre, setNombre] = useState("");
const[edad, setEdad] = useState("");
const[pais, setPais] = useState("");
const[cargo, setCargo] = useState("");
const[antiguedad, setAntiguedad] = useState("");
const[editar, setEditar] = useState(false);
const[id, setId] = useState("");

const [empleadosList, setEmpleadosList] = useState([]);


//metodo para añadir a los empleados
const add = () => {  

  if(nombre!==""&&edad!==""&&pais!==""&&cargo!==""&&antiguedad!==""){
axios.post('http://localhost:3001/create', {
  nombre: nombre,
  edad: edad,
  pais: pais,
  cargo: cargo,
  antiguedad: antiguedad
}).then(() => {
  limpiarcampos();
  getEmpleados();  
   Swal.fire({
  title: "Bien hecho",
  text: "Empleado registrado con exito!",
  icon: "success",
  timer: 2000
});
});
  }else{
     Swal.fire({
  title: "Cuidado",
  text:"Debes rellenar todos los campos para continuar!",
  icon: "warning",
  timer: 2000
});
  }



}




// metodo de actualizacion de los campos ya rellenados
const update = () => {  
axios.put('http://localhost:3001/update', {
  id:id,
  nombre: nombre,
  edad: edad,
  pais: pais,
  cargo: cargo,
  antiguedad: antiguedad
}).then(() => {
  
  getEmpleados();
  limpiarcampos();

 Swal.fire({
  title: "Bien hecho",
  text: "Empleado actualizado con exito!",
  icon: "success",
  timer: 2000
})
});
}
//metodo para cancelar la accion de actualizacion y volver todo a su forma original
const limpiarcampos =()=>{

setNombre("");
setEdad(0);
setPais("");
setCargo("");
setAntiguedad(0);
setEditar(false);

}
//metodo para borrar a los empleados
const deleteEmple = (id) => {  
   Swal.fire({
  title: "CUIDADO",
  text: "Esta seguro que quiere eliminar a este empleado?!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText:'Si, eliminarlo!'

}).then(res=>{
  if(res.isConfirmed){
    axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
  
  getEmpleados();
  limpiarcampos();


});
//implementacion de la libreria swetalert para los mensajes de confirmacion
     Swal.fire({
  title: "eliminado",
  text: "Empleado eliminado con exito!",
  icon: "success",
  timer: 1500
});

  }
})

}

// para setear los nuevos datos al presionar el boton actualizar
const editarEmpleado = (val)=>{
setEditar(true);

setNombre(val.nombre);
setEdad(val.edad);
setPais(val.pais);
setCargo(val.cargo);
setAntiguedad(val.antiguedad);
setId(val.id);


}


const getEmpleados = () => {
  axios.get('http://localhost:3001/empleados').then((response) => {
    
    setEmpleadosList(response.data);
  });
}

 useEffect(() => {
    getEmpleados();
  }, []);

  return (
  <div className="container">
  
    
        <div className='lista'>
   

    </div>

<div className="card text-center">
  <div className="card-header">
    GESTOR

  </div>

  <div className="card-body">
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">NOMBRE:</span>
  <input type="text" 
   onChange={(e) => setNombre(e.target.value)
   }
  className="form-control" value={nombre} required placeholder="ingrese su nombre" aria-label="Username" aria-describedby="basic-addon1"/>
</div>


<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">EDAD:</span>
  <input type="text" 
   onChange={(e) => setEdad(e.target.value)
   }
  className="form-control"value={edad} required placeholder="ingrese su edad" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

     
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">PAIS:</span>
  <input type="text" 
   onChange={(e) => setPais(e.target.value)
   }
  className="form-control" value={pais} required placeholder="ingrese su pais" aria-label="Username" aria-describedby="basic-addon1"/>
</div>


     <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">CARGO:</span>
  <input type="text" 
   onChange={(e) => setCargo(e.target.value)
   }
  className="form-control" value={cargo} required placeholder="ingrese el cargo" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

   <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Antiguedad:</span>
  <input type="text" 
   onChange={(e) => setAntiguedad(e.target.value)
   }
  className="form-control" value={antiguedad} required placeholder="ingrese su Antiguedad" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

    


  </div>
  <div className="card-footer text-body-secondary">
     

{
editar?
<div>
 <button className='btn btn-warning m-2'
      onClick={update}
      >Actualizar</button>
<br></br>
<button className='btn btn-info m-2'
      onClick={limpiarcampos}
      >cancelar</button>
</div>
:<button className='btn btn-success'
      onClick={add}
      >Registrar</button>

 

}


  </div>
</div>

<table className="table table-striped">
   
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">nombre</th>
      <th scope="col">edad</th>
      <th scope="col">pais</th>
      <th scope="col">cargo</th>
    <th scope="col">antiguedad</th>
    <th scope="col">accion</th>
    </tr>
  </thead>
  <tbody>
   
   
   
       {

        empleadosList.map((val,key)=>{
          return<tr key={val.id}>
            <th >{val.id}</th>
            <td >{val.nombre}</td>
            <td >{val.edad}</td>
            <td >{val.pais}</td>
            <td >{val.cargo}</td>
            <td >{val.antiguedad}</td>
            <td >
 

<div className="btn-group" role="group" aria-label="Basic mixed styles example">
  <button type="button" 
  onClick={()=>{
    editarEmpleado(val);
  }}
  
  className="btn btn-success m-2">Editar</button>
 
  <button type="button" onClick={()=>{
    deleteEmple(val.id);
  }} className="btn btn-danger m-2">Borrar</button>
 
  
           </div>

           </td>
          </tr>
        

        })
      }
  </tbody>
</table>


    </div>
  );

}

export default App;