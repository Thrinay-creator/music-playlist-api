
const Song=require("../models/songs");
exports.getSongs=(async(req,res,next)=>{
    try{
         const filter = {};
         // Filter by exact mood (e.g., ?mood=Happy)
        if (req.query.mood) {
            filter.mood = req.query.mood;
        }

        // Filter by liked status (e.g., ?liked=true)
        if (req.query.liked) {
            // Converts string 'true' or 'false' from query params to an actual Boolean
            filter.liked = req.query.liked === 'true';
        }

        // Filter by duration range (e.g., ?minDuration=120&maxDuration=300)
        if (req.query.minDuration || req.query.maxDuration) {
            filter.durationSec = {};
            if (req.query.minDuration) filter.durationSec.$gte = Number(req.query.minDuration);
            if (req.query.maxDuration) filter.durationSec.$lte = Number(req.query.maxDuration);
        }

        // Text search / Substring match for song name (e.g., ?search=love)
        if (req.query.search) {
            filter.song = { $regex: req.query.search, $options: 'i' }; // 'i' makes it case-insensitive
        }

        // Filter by release year/date range if provided (e.g., ?releasedAfter=2020-01-01)
        if (req.query.releasedAfter || req.query.releasedBefore) {
            filter.releasedOn = {};
            if (req.query.releasedAfter) filter.releasedOn.$gte = new Date(req.query.releasedAfter);
            if (req.query.releasedBefore) filter.releasedOn.$lte = new Date(req.query.releasedBefore);
        }

        // 2. Execute query with the generated filters
       
        let query = Song.find(filter);

        if (req.query.sort === "durationSec") {
            query = query.sort({ durationSec: 1 });
        }

        const songs = await query;
        res.status(200).json(songs);
    }
    catch(error){
        next(error);
    }
});
exports.getSong=(async(req,res,next)=>{
    try{
        const id=req.params.id;
        const song=await Song.findById(id);
        if(!song){
            return res.status(404).json({
                message:"SOngs not found"
            });
        }
        res.status(200).json(song);
    }
    catch(error){
        next(error);
    }
});
exports.uploadSong=(async(req,res,next)=>{
    try{
        const{song,durationSec,mood,liked,releasedOn}=req.body;
        if(!song){
            return res.status(404).json({
                message:"song name is required"
            });
        }
       
        if(!durationSec){
            return res.status(404).json({
                message:"Duration time(in sec) is required"
            });
        }
        const songs=await Song.create(req.body);
    
        return res.status(201).json(songs);
        
    }
    catch(error){
        next(error);
    }
});
exports.updateSong=(async(req,res,next)=>{
     try {
        const id = req.params.id;

        const song = await Song.findByIdAndUpdate(id, req.body, {
            returnDocument: "after", runValidators: true
        });
        if (!song) {
            return res.status(404).json({
                message: "song not found"
            });
        }

        res.status(200).json(song);
    } catch(err) {
        next(err);
    }
});
exports.deleteSong=(async(req,res,next)=>{
     try{
    const id = req.params.id;
    const song = await Song.findByIdAndDelete(id);

    if (!song) {
        return res.status(404).json({
            message: "Song not found"
        });
    }

    res.status(200).json({
        message: "Song deleted successfully"
    })
    }
    catch(error){
        next(error);
    }
})