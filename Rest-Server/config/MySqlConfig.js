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

export const getDraftsFromMySql = () =>{

  return new Promise((resolve, reject) =>{

    let sql = "SELECT * FROM drafts";

    connection.query(sql, (err, results, fields) =>{
      if(err){
        console.error("Error al ejecutar la consulta: ", sql, err);
        reject(err);
      }else{
        const data = results.map((row)=>{
          return {...row};
        })
        resolve(data);
      }
    })

  })

}

export const getDraftByIdFromMySql = (id) =>{

  return new Promise((resolve, reject) =>{

    let sql = "SELECT * FROM drafts WHERE id_draft = ?";
    connection.query(sql,[id], (err, results, fields) =>{
      if(err){
        console.error("Error al ejecutar la consulta: ", sql, err);
        reject(err);
      }else{
        const data = results.map((row)=>{
          return {...row};
        })
        resolve(data);
      }
    })

  })

}

export const setDraft = (draft, callback) =>{

    let sql = "INSERT INTO drafts (title, description, category, preparation_time, id_user) VALUES (?, ?, ?, ?, ?)";

    connection.query(
      sql,
      [draft.titulo, draft.descripcion, draft.categoria, draft.tiempoDePreparacion, draft.id_user],
      (err, result) => {
        if (err) {
          console.error("Error al ejecutar el INSERT:", sql, err);
          callback(err, null);
        } else {
          callback(null, result.insertId);
        }
      }
    );

}

export const putDraftSql = (id, draft, callback) =>{

  let sql = "UPDATE drafts SET title = ?, description = ?, category = ?, preparation_time = ?, ingredients = ?, steps = ? WHERE id_draft = ?"
  connection.query(
    sql,
    [draft.titulo, draft.descripcion, draft.categoria, draft.tiempoDePreparacion, draft.ingredients, draft.steps, id],
    (err, result) =>{

      if(err){

        console.error("Error al ejecutar el update: ", sql, err);
        callback(err, null);

      }else{
        callback(null, result);
      }

    }
  )

}