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
    static async addlist(title,sev,adddate,luY,luM,luD,hidden)
    {
        try
        {
            const todoDoc = 
            {
                title : title,
                sev  : sev,
                adddate : adddate,
                luY:luY,
                luM:luM,
                luD:luD,
                hidden : hidden
            }

            return await lttodo.insertOne(todoDoc);
        }
        catch(e)
        {
            console.error(`Unable to add todo: ${e}`);
            return { error : e};
        }
    }

    static async deletetodo(id)
    {
        try
        {   
            const deleteResponse = await lttodo.deleteOne({ _id : new ObjectId(id)});
            return deleteResponse;
        }
        catch(e)
        {
            console.error(`Unable to delete review: ${e}`);
            return { error : e};
        }
    }

    static async hidetodo(id,luY,luM,luD,ishidden)
    {
        try
        {
            const updateResponse = await lttodo.updateOne({ _id : new ObjectId(id)},{$set : {hidden: ishidden,luY:luY,luM:luM,luD:luD}});
            return updateResponse;
        }
        catch(e)
        {
            console.error(`Unable to update review: ${e}`);
            return { error : e};
        }
    }
    static async unhideALL(filter)
    {
        try
        {
            const updateResponse = await lttodo.updateMany(filter,{$set : {hidden: false}});
            return updateResponse;
        }
        catch(e)
        {
            console.error(`Unable to update review: ${e}`);
            return { error : e};
        }
    }
    

}

module.exports = ltDAO