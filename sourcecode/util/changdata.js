module.exports = {
    multiToObject:function(obj){
        return obj.map((obj) => obj.ToObject())
    },
    simpleToObject:function(obj){
        return obj ? obj.ToObject() : obj
    }
}