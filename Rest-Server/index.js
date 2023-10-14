import specs from "./config/swaggerConfig.js";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import routes from "./routes.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://127.0.0.1:5173" }));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());

app.use("/", routes);

app.listen(8080, () => console.log("\nhttp://localhost:8080/swagger/#/\n"));