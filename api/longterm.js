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
            const luY = adddate.getFullYear();
            const luM = adddate.getMonth();
            const luD = adddate.getDate();
            const hidden = false;
            const RevRes = await ltDAO.addlist(title,sev,adddate,luY,luM,luD,hidden);
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
            const delres = await ltDAO.deletetodo(id)

            res.json({status:"success"});
        }
        catch(e)
        {
            res.status(500).json({error:e.message});
        }
    }

    static async apihide(req,res,next)
    {
        try
        {
            const id = req.body.id;
            const ishidden = req.body.ishidden;
            const lastupdate = new Date();
            const luY = lastupdate.getFullYear();
            const luM = lastupdate.getMonth();
            const luD = lastupdate.getDate();
            const ltRes = await ltDAO.hidetodo(id,luY,luM,luD,ishidden);

            var {error} = ltRes;
            if(error)
            {
                res.status(400).json({error});
            }
            res.json({status : "success"})
        }  
        catch(e)
        {
            res.status(500).json({error:e.message});
        }
    }


    static async batchupdate(req,res,next)
    {
        try
        {
        let today = new Date();
        let TD = today.getDate();
        let TM = today.getMonth();
        let TY = today.getFullYear();
        today.setUTCHours(0, 0, 0);
        let filter = {$or:[{"luY": {"$ne":TY}},{"luM": {"$ne":TM}},{"luD": {"$ne":TD}}]}
        //{"$eq": ["this.lastupdate.getMonth()", 4]}
        
        const ltRes = await ltDAO.unhideALL(filter);

        var {error} = ltRes;
            if(error)
            {
                res.status(400).json({error});
            }
            res.json({status : "success"})
        }  
        catch(e)
        {
            res.status(500).json({error:e.message});
        }
    }

}

module.exports = longterm