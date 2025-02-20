import { pool } from "../db.js";

export const getRoles = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tb_rol");

    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};
export const getRol = async (req, res) => {
try {
    const [result] = await pool.query("SELECT * FROM tb_rol WHERE idtb_rol=?", [
        req.params.id,
      ]);
    
      if (result.length === 0) {
        return res.status(404).json({ mensaje: "Rol no encontrado" });
      }
      res.json(result[0]);
} catch (error) {
    return res.status(500).json({ mensaje: error.message });
}
  
};
export const createRol = async (req, res) => {
    
  try {
    const { descripcion } = req.body;
  const [result] = await pool.query(
    "INSERT INTO tb_rol(descripcion) VALUES (?)",
    [descripcion]
  );

  console.log(result);

  res.json({
    id: result.insertId,
    descripcion,
  });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};
export const updateRol = async (req, res) => {
    try {
        const [result] = await pool.query("UPDATE tb_rol SET ? WHERE idtb_rol = ?", [
            req.body,
            req.params.id,
          ]);
        
          res.json(result); 
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
  
};
export const deleteRol = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM tb_rol WHERE idtb_rol=?", [
            req.params.id,
          ]);
        
          if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Tarea no encontrada" });
          }
          return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
  
};
