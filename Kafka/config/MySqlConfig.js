import { createConnection } from "mysql";

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "DSSDGrupoH2023",
});

export function testConexion() {
  connection.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err);
    } else {
      console.log("\n\nConexión exitosa a la base de datos\n\n");
    }
  });

  connection.end();
}

export function getCommentsFromMySQL(recipeId) {
  
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM comments_recipes WHERE id_recipe_comment = ?";

    connection.query(sql, [recipeId], (err, rows) => {
      if (err) {
        console.error("Error al ejecutar la consulta:", sql, err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}


export function saveCommentInMySQL(comment, callback) {

  const sql = "INSERT INTO comments_recipes (id_user_comment, id_recipe_comment, comment) VALUES (?, ?, ?)";

  connection.query(sql, [comment.idUserComment, comment.idRecipeComment, comment.comment], (err, result) => {
    if (err) {
      console.error("Error al ejecutar el INSERT:", sql, err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}