const userSchema = mongoose.Schema({
    user_id: { 
        type: String, 
        required: true ,
        unique: true
    },
    alram:{
        type:String,
    },
    
    favorite:{
        type:[String],
    },
    history:{
        type:[String],
    },
    score:{
        E: { type: Number, default: 0 },
        I: { type: Number, default: 0 },
        S: { type: Number, default: 0 },
        N: { type: Number, default: 0 },
        T: { type: Number, default: 0 },
        F: { type: Number, default: 0 },
        J: { type: Number, default: 0 },
        P: { type: Number, default: 0 },
    },
}, { versionKey: false })

module.exports = mongoose.model('users', userSchema);