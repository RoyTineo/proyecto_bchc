import { pool } from "../db.js";

export const getSolicitudes = async (req,res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tb_solicitud");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const getSolicitud = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM  tb_solicitud WHERE idtb_solicitud = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }
    res.json(result[0]);
  } catch (error) {}
};

export const createSolicitud = async (req, res) => {
  try {
    const {
      fecha_solicitud,
        tipo_credito,
        destino,
        moneda,
        monto,
        plazo,
        idtb_personaSolicitante, // Debería ser el ID de la persona solicitante
        idtb_personaFiador,// Debería ser el ID de la persona fiador
        situacion,
        
      
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO tb_solicitud(fecha_solicitud,tipo_credito,destino,moneda,monto,plazo,idtb_personaSolicitante, idtb_personaFiador, situacion) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        fecha_solicitud,
        tipo_credito,
        destino,
        moneda,
        monto,
        plazo,
        idtb_personaSolicitante, // ID del solicitante
        idtb_personaFiador, // ID del fiador
        situacion,
        
        
      ]
    );
    return res.status(200).json({
      id: result.insertId,
      fecha_solicitud,
        tipo_credito,
        destino,
        moneda,
        monto,
        plazo,
        idtb_personaSolicitante,
        idtb_personaFiador,
        situacion,
      
        // fecha_creacion,
        // fecha_actualizacion
    });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const updateSolicitud = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE tb_solicitud SET ? WHERE idtb_solicitud = ?",
      [req.body, req.params.id]
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

// Eliminar solicitud, cambiando de estado a 0
export const deleteSolicitud = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE tb_solicitud SET ? WHERE idtb_solicitud = ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

