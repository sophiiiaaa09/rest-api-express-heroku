const dotenv = require('dotenv')
dotenv.config()
const mysql2 = require('mysql2')

class DBConnection{
    constructor(){
        this.db = mysql2.createPool({
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_DATABASE,
            port : process.env.DB_PORT
        })
        
        this.checkConnection()
    }

    checkConnection(){
        this.db.getConnection((err,connection) => {
            if(err){
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');

                }
            }
            if(connection){
                connection.release()
            }
            return
        })
    }

    query = async (sql,values) => {
        return new Promise((resolve,reject) => {
            const callback = (error,result) => {
                if(error){
                    reject(error)
                    return
                }
                resolve(result)
            }

            this.db.execute(sql,values,callback)
        }).catch(error => {
            const mysqlErrorList = Object.keys(HttpStatusCodes)

            error.status = mysqlErrorList.includes(error.code) ? HttpStatusCodes[error.code] : error.status
            console.log('error disini')
            throw error
        })
    }

}
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
})


module.exports = new DBConnection().query


/* const dotenv = require('dotenv')
dotenv.config()
const mysql2 = require('mysql2')

const connection = mysql2.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    port : process.env.DB_PORT
})

connection.connect(error => {
    if(error) throw error
    console.log(`connected to ${process.env.DB_DATABASE}`)
})

module.exports = connection */