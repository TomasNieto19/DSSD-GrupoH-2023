import specs from "./config/swaggerConfig.js";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import routes from "./routes.js";
import express from "express";
import cors from "cors";

const app = express();

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());

app.use("/", routes);

app.use(cors());

app.listen(8080, () => console.log("\nServer is running on port 8080.\n"));