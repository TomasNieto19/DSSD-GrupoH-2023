import { setDraft } from "../config/MySqlConfig.js";

export const postDraft = async (req, res) => {

  const draft = req.body;

  try {

    setDraft(draft, (err, insertedId) => {

      if (err) {

        console.error("Error al intentar insertar el borrador: ", err);

      } else {

        res.json({ id_draft: insertedId });
        
      }
    });

  } catch (error) {

    console.log(error);

  }
};