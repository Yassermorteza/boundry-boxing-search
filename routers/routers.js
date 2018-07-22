const Router = require('koa-router');
const SportModel = require('../models/sport.model');

const router = new Router();

const log =console.log;

router
    .post('/sport', async (ctx, next)=>{
        try {
            const body = ctx.request.body
            const sportIns = new SportModel({
                sportName: body.sportName,
                geometry: { coordinates:[body.lng, body.lat]},
                sportType: body.type,
                timestamp: Date.now()
            });
            const sport = await sportIns.save();
            ctx.body ={status:'success', message:'New Sport venue added.'};
        } catch (err) {
            log(err);
            ctx.throw(412, { err });
        }
    })

module.exports = router;
