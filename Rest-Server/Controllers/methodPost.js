export const methodPost = async (req, res) => {

  const mensaje = req.body.message;

  return res.json({ message: `METODO POST! ${mensaje}` });
};
