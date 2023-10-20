import { putDraftSql } from "../config/MySqlConfig.js";

export const putDraft = async (req, res) => {
  const draft = req.body;
  const id = req.params.id;
    try {
      
    putDraftSql(id, draft, (err, result)=>{

      if(err){

        console.error("Error al intentar insertar el borrador: ", err);

      }else{

        res.json({id_draft: result});

      }

    })
    } catch (error) {
      console.log(error);
    }
    
  };