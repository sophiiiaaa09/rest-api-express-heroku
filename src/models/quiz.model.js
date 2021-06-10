const query = require('../db/db-connection')
const tablename = 'quizzes'
const tokentable = 'user_quiz'
exports.getAll = async () => {
    let sql = `SELECT * FROM ${tablename}`

    return await query(sql)
}
exports.getById = async (id) => {
    let sql = `SELECT * FROM ${tablename} WHERE id = ?`

    return await query(sql,[id])
}

exports.create = async ({question,choice}) => {
    let sql = `INSERT INTO ${tablename}
        (question,choice) VALUES (?,?)
    `

    const result = await query(sql,[question,choice])
    const afrows = result ? result.affectedRows : 0

    return afrows
}

exports.getByToken = async (token) => {
    let sql = `SELECT * FROM ${tokentable}
    JOIN super_quiz ON super_quiz.id = ${tokentable}.super_quiz_id
    JOIN quizzes ON quizzes.super_quiz_id = super_quiz.id
    WHERE token = ?
    `

    const result = await query(sql,[token])
    return result
}