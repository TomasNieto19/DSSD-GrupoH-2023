import { deleteDraftSQL } from "../config/MySqlConfig.js";


export const deleteDraft = async (req, res) => {
    const {id} = req.params;
    try {
      
        deleteDraftSQL(id, (err, result)=>{
    
          if(err){
    
            console.error("Error al intentar borrar el borrador: ", err);
    
          }else{
    
            res.json({result});
    
          }
    
        })
        } catch (error) {
          console.log(error);
        }
}