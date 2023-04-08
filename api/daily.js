const dailyDAO = require("./DAO/dailyDAO");

class daily
{
    static async apiGetAll(req,res,next)
    {
        const dailys = await dailyDAO.getAll();

        let response = 
        {
            list: dailys
        }

        res.json(response)
    }

    static async apiPostNew(req,res,next)
    {
        try
        {
            const title = req.body.title;
            const sev = req.body.sev;
            const date = new Date();
            const RevRes = await dailyDAO.addlist(title,sev,date);
            res.json({status : "success"})
        }  
        catch(e)
        {
            res.status(500).json({error:e.message});
        }
    }

    static async apiDelete(req,res,next)
    {
        try
        {
            const id = req.body.id;
            const delres = await dailyDAO.deletetodo(id)

            res.json({status:"success"});
        }
        catch(e)
        {
            res.status(500).json({error:e.message});
        }
    }
    
}

module.exports = daily