import { saveCommentsInMySQL } from "./Functions/saveCommentsInMySQL.js";
import specs from "./config/swaggerConfig.js";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import routes from "./routes.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { savePopularityRecipesInMySQL } from "./Functions/savePopularityRecipesInMySQL.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://127.0.0.1:5173" }));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());

app.use("/", routes);

// savePopularityRecipesInMySQL();

//setInterval(saveCommentsInMySQL, 60 * 1000); // (60 segundos * 1000 ms)

app.listen(8080, () => console.log("\nServer is running on port 8080.\n"));