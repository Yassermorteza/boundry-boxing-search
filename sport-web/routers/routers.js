const Router = require('koa-router');
const SportModel = require('../models/sport.model');

const router = new Router();

const log =console.log;

router
    .get('/search/:lnglat', async (ctx, next)=>{
        try {
            //Params format should be like: search/0,0,100,100  longitude, latitude 
            const lnglat = ctx.params.lnglat.split(',');
            const result = await SportModel.find( { "geometry.coordinates": { "$geoWithin": { "$box":[[ lnglat[0], lnglat[1] ], [lnglat[2], lnglat[3]]]}}}).exec();
            ctx.body = {status:"success", result: result};
        } catch (err) {
            log(err);
            ctx.throw(412, { err });
        }
    })
    .put('/sport/:id', async (ctx, next)=>{
        try {
            const id = ctx.params.id;
            const body = ctx.request.body;
            let sport = await SportModel.findById(id);
            const newSport = {
                sportName: body.sportName || sport.sportName,
                geometry:{coordinates: [body.lng || sport.lng, body.lat || sport.lat], type:"Point"},
                sportType: body.type || sport.sportType,
                timestamp: Date.now()
            };

            sport = await SportModel.findOneAndUpdate({_id: id},
                                                        {$set: newSport},
                                                        {new:true ,multi: true},
                                                        (err, sport)=>sport);

            ctx.body = {status: "success", sport};

        } catch (err) {
            log(err);
            ctx.throw(412, { err });
        }
    })
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
