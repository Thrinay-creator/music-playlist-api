//It is used for Schema of Product Model
const mongoose=require("mongoose");
const songsSchema=new mongoose.Schema({
    song:{
        type:String,
        required:true,
        trim:true
    },
    durationSec:{     
        type:Number,
        required:true,
        min:30,
        max:1200
    },
    mood:{
        type:String,
       enum:["happy","sad","chill","party"],
       default:"chill"

    },
      liked: {
      type: Boolean,
      default: false
    },

    releasedOn: {
      type: Date,
      required: false
    }
    
},{
    timestamps:true
});
module.exports = mongoose.model("Song", songsSchema);