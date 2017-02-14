/**
 * Created by l23460 on 28.11.2016.
 */
var WhatsApp =(function(WhatsApp){
    function Message(text,image,time,type){
        this.text = text;
        this.image = image;
        this.time = time;
        this.type = type;
    }

    WhatsApp.Message = Message;
    return WhatsApp;
})(WhatsApp||{});