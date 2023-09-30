import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "DSSD-GrupoH-2023",
      version: "1.0.0",
      description: "API Node js + Apache Kafka",
    },
  },
  apis: ["./routes.js"],
};

const specs = swaggerJsdoc(options);

export default specs;