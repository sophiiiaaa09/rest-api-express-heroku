const query = require('../db/db-connection')

const {multipleColumnSet} = require('../util/common.utils')
const tablename = 'users'

exports.findOne = async (params) => {
    const {columnSet,values} = multipleColumnSet(params)

    const sql = `SELECT * FROM ${tablename} WHERE ${columnSet}`

    const result = await query(sql,[...values])

    return result[0]
}
exports.findOneById = async (params) => {
    

    const sql = `SELECT * FROM ${tablename} WHERE id = ?`

    const result = await query(sql,[params])

    return result
}
exports.create = async ({email,password}) => {
    const sql = `INSERT INTO ${tablename}
    (email,password) VALUES (?,?)
    `

    const result = await query(sql,[email,password])
    const afrows = result ? result.affectedRows : 0

    return afrows
}

exports.checkToken = async (token) => {
    const sql = `SELECT * FROM `
}