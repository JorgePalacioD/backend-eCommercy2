const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./controllers/UserController");
const operadorRouter = require("./controllers/OperadorController");
const operadoresTarifasRouter = require('./controllers/OperadoresTarifasController');
const facturasRouter = require('./controllers/FacturasController');
const sedesRouter = require('./controllers/SedesController');

const app = express();

// Configura CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware para parsear cuerpos de solicitud
app.use(bodyParser.json());

// Conectar rutas
app.use("/api", userRouter);
app.use("/api", operadorRouter);
app.use('/api', operadoresTarifasRouter);
app.use('/api', facturasRouter);
app.use('/api', sedesRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
