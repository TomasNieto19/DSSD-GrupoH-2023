import { createConnection } from "mysql";

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "1911",
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

export function getRecipePopularityFromMySQL(recipeId) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM popularity_recipes WHERE id_recipe = ?";

    connection.query(sql, [recipeId], (err, rows) => {
      if (err) {
        console.error("Error al ejecutar la consulta:", sql, err);
        reject(err);
      } else if (Array.isArray(rows) && rows.length > 0) {
        resolve(rows[0].score);
      } else {
        resolve(0);
      }
    });
  });
}

export function updateRecipePopularityInMySQL(recipeId, newScore, callback) {

  // Se obtiene el puntaje de la receta de la base de datos
  getRecipePopularityFromMySQL(recipeId)
    .then((existingScore) => {

      // Si el puntaje calculo es = al que ya estaba guardado, no se hace nada
      if (existingScore === newScore) {
        callback(null, null);
        return;
      }

      let sql;

      if (existingScore > 0) {

        // Si ya tiene puntaje guardado, se suma al calculado y se guarda
        const updatedScore = existingScore + newScore;

        sql = "UPDATE popularity_recipes SET score = ? WHERE id_recipe = ?";

        connection.query(sql, [updatedScore, recipeId], (err, result) => {
          if (err) {
            console.error("Error al actualizar la popularidad:", sql, err);
            callback(err, null);
          } else {
            callback(null, result);
          }
        });

        // En caso de que no haya popularidad para la receta, se inserta
      } else {
        sql = "INSERT INTO popularity_recipes (id_recipe, score) VALUES (?, ?)";

        connection.query(sql, [recipeId, newScore], (err, result) => {
          if (err) {
            console.error("Error al insertar la popularidad:", sql, err);
            callback(err, null);
          } else {
            callback(null, result);
          }
        });
      }
    })
    .catch((err) => {
      callback(err, null);
    });
}

export function getUsersPopularityFromMySQL() {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM popularity_users";

    connection.query(sql, (err, rows) => {
      if (err) {
        console.error("Error al ejecutar la consulta:", sql, err);
        reject(err);
      } else if (Array.isArray(rows) && rows.length > 0) {
        resolve(rows);
      } 
    });
  });
}

export function updateUserPopularityInMySQL(userId, newScore, callback) {
      
  const sql = "UPDATE popularity_users SET score = ? WHERE id_user = ?";

  connection.query(sql, [newScore, userId], (err, result) => {
    if (err) {
      console.error("Error al actualizar la puntuación del usuario:", sql, err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });

}


export function saveCommentInMySQL(comment, callback) {
  const sql = "INSERT INTO comments_recipes (id_user_comment, id_recipe_comment, comment) VALUES (?, ?, ?)";

  connection.query(
    sql,
    [comment.idUserComment, comment.idRecipeComment, comment.comment],
    (err, result) => {
      if (err) {
        console.error("Error al ejecutar el INSERT:", sql, err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
}