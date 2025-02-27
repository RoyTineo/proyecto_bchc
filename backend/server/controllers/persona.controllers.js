import { pool } from "../db.js";

export const getPersonas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tb_persona");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const getPersona = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM  TB_PERSONA WHERE idtb_persona = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }
    res.json(result[0]);
  } catch (error) {}
};
export const getPersonaByDNI = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM  tb_persona WHERE dni = ?",
      [req.params.dni]
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: "Persona no encontrada por DNI" });
    }
    res.json(result[0]);
  } catch (error) {}
};

export const createPersona = async (req, res) => {
  try {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      dni,
      ruc,
      direccion,
      telefono,
      correo,
      observacion,
      tipo,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO tb_persona(nombre, apellidoPaterno, apellidoMaterno, dni, ruc, direccion, telefono, correo, observacion,  tipo) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        dni,
        ruc,
        direccion,
        telefono,
        correo,
        observacion,
        tipo,
      ]
    );
    return res.status(200).json({
      id: result.insertId,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      dni,
      ruc,
      direccion,
      telefono,
      correo,
      observacion,
      tipo,
    });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const updatePersona = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE tb_persona SET ? WHERE idtb_persona = ?",
      [req.body, req.params.id]
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

// Eliminar persona, cambniando de estado a 0
export const deletePersona = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE tb_persona SET ? WHERE idtb_persona = ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};
// export const deletePersona = async (req, res) => {
//   try {
//     const [result] = await pool.query("DELETE FROM tb_persona WHERE idtb_persona=?", [
//         req.params.id,
//       ]);

//       if (result.affectedRows === 0) {
//         return res.status(404).json({ mensaje: "Tarea no encontrada" });
//       }
//       return res.sendStatus(204);
// } catch (error) {
//     return res.status(500).json({ mensaje: error.message });
// }
// };
