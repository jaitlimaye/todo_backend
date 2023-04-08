const ltDAO = require("./DAO/ltDAO");

class longterm
{
    static async apiGetAll(req,res,next)
    {
        const lts = await ltDAO.getAll();

        let response = 
        {
            list: lts
        }

        res.json(response)
    }

    static async apiPostNew(req,res,next)
    {
        try
        {
            const title = req.body.title;
            const sev = req.body.sev;
            const adddate = new Date();
            const lastupdate = adddate;
            const RevRes = await ltDAO.addlist(title,sev,adddate,lastupdate);
            res.json({status : "success"})
        }  
        catch(e)
        {
            res.status(500).json({error:e.message});
        }
    }
}

module.exports = longterm