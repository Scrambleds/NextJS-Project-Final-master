import mysql from "mysql2/promise"

export async function query({querry,values = []}){
    const dbConnection = await mysql.createPool({
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user:process.env.MYSQL_USER,
        password:process.env.MYSQL_PASSWORD
    })

    try{
        const [results] =await dbConnection.execute(querry,values);
        dbConnection.end();
        return results;
    }catch(error){
        throw Error(error.message);
        return {error};
    }
}

export default query;