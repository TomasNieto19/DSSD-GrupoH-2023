import { savePopularityRecipesInMySQL } from "./Functions/savePopularityRecipesInMySQL.js";
import { savePopularityUsersInMySQL } from "./Functions/savePopularityUsersInMySQL.js";
import { saveCommentsInMySQL } from "./Functions/saveCommentsInMySQL.js";
import specs from "./config/swaggerConfig.js";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import routes from "./routes.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://127.0.0.1:5173" }));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());

app.use("/", routes);

setInterval(savePopularityRecipesInMySQL, 300 * 1000); // (60 segundos * 1000 ms)

setInterval(savePopularityUsersInMySQL, 300 * 1000); // Lo reliza cada 5 minutos

setInterval(saveCommentsInMySQL, 300 * 1000); 

app.listen(8080, () => console.log("\nServer is running on port 8080.\n"));