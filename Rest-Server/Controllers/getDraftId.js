import { getDraftByIdFromMySql, getDraftsFromMySql } from "../config/MySqlConfig.js";

export const getDraftsId = async (req, res) => {
    const {id} = req.params;
    try {
        let messages = await getDraftByIdFromMySql(id);
        console.log(messages)
        res.json(messages);
    } catch (error) {
        console.log(error);
    }
}