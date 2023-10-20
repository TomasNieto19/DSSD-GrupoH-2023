import { getDraftByIdFromMySql, getDraftsFromMySql } from "../config/MySqlConfig.js";

export const getDraftsId = async (req, res) => {
    const {id} = req.params;
    try {
        let messages = await getDraftByIdFromMySql(id);
        res.json(messages ? messages[0] : messages);
    } catch (error) {
        console.log(error);
    }
}