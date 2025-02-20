import { pool } from "../db.js"

export const getRegistros = (req, res)=>{
    res.send('Obteniendo Registro')
}
export const getRegistro = (req, res)=>{
    res.send('Obteniendo una Registro')
}
export const createRegistro = async (req, res)=>{
const{title} =req.body
const result = await pool.query('')

    res.send('Creando Registro')
}
export const updateRegistro = (req, res)=>{
    res.send('Actualizando Registro')
}
export const deleteRegistro = (req, res)=>{
    res.send('Eliminando Registro')
}
