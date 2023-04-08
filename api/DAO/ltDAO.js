mongodb = require("mongodb")


const ObjectId = mongodb.ObjectId;

let lttodo;

class ltDAO
{
    static async injectDB(conn)
    {
        if(lttodo)
        {
            return;
        }
        try{
            lttodo = await conn.db(process.env.REV_NS).collection("lt")
        }catch(err)
        {
            console.error(
                `Unable to establish a collection handle in /api/dao/ltDAO.js: ${err}`,
            )
        }
    } 

    static async getAll()
    {
        let cursor;
        try
        {
            cursor= await lttodo.find()
        }
        catch(err)
        {
            console.error(`Unable to issue find command, ${err}`)
            return [];
        }

        try
        {
            const TodoList = await cursor.toArray();
            return TodoList;
        }
        catch(err)
        {
            console.error(`Unable to convert cursor to array or problem counting documents, ${err}`);
            return [];
        }
    }

    static async addlist(title,sev,adddate,lastupdate)
    {
        try
        {
            const todoDoc = 
            {
                title : title,
                sev  : sev,
                adddate : adddate,
                lastupdate : lastupdate
            }

            return await lttodo.insertOne(todoDoc);
        }
        catch(e)
        {
            console.error(`Unable to add todo: ${e}`);
            return { error : e};
        }
    }

}

module.exports = ltDAO