import { getDraftsFromMySql } from "../config/MySqlConfig.js";

export const getDrafts = async (req, res) => {

  try {

    let messages = await getDraftsFromMySql();

    res.json(messages);

  } catch (error) {

    console.log(error);

  }
};