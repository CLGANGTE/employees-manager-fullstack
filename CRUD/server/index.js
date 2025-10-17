const express = require('express');
const app = express();

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const mysql = require('mysql2'); 

app.use(express.json());

//conexion a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user:'youruser',
  password:'yourpassword',
  database: 'EMPLEADOS_CRUD'
});



//metodod de insercion de datos a la base de datos mysql
app.post('/create', (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const antiguedad = req.body.antiguedad;

  db.query('INSERT INTO empleados (nombre, edad, pais, cargo, antiguedad) VALUES (?,?,?,?,?)',
  [nombre, edad, pais, cargo, antiguedad],
  (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send("empleado registrado con exito");
    }
  });
});


//metodo de borrado de datos de la tabla desde la aplicacion web
//manda a llamar id como paramatro de seleccion para borrar todos los datos ligados con ese id
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;


  db.query('DELETE FROM empleados WHERE id=?',
  id,
  (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send("empleado eliminado con exito");
    }
  });
});

//metodo para recuperar la informacion de los empleados desde la base de datos
app.get('/empleados', (req, res) => {
db.query('SELECT * FROM empleados' ,

  (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//metodo para actualizar la informacion de un empleado si es que asi es requerido
app.put('/update', (req, res) => {
  const id= req.body.id;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const antiguedad = req.body.antiguedad;

  db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, antiguedad=? WHERE id=?',
  [nombre, edad, pais, cargo, antiguedad, id],
  (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send("empleado actualizado con exito");
    }
  });
});

//mensaje de conexion a la base de datos por medio de la terminal
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
}   );  

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});