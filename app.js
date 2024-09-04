const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./adapters/controllers/UserController");
const operadorRouter = require("./adapters/controllers/OperadorController");
const operadoresTarifasRouter = require('./adapters/controllers/OperadoresTarifasController');
const facturasRouter = require('./adapters/controllers/FacturasController');
const sedesRouter = require('./adapters/controllers/SedesController');

const app = express();

// Configura CORS
app.use(
  cors({
    origin: "http://localhost:5173",
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
