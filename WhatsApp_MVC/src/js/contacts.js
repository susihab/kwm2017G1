/**
 * Created by l23460 on 28.11.2016.
 */
var WhatsApp =(function(WhatsApp){
    function Contact(id,username,image,slogan,lastOnline){
        this.id = id;
        this.username = username;
        this.image = image;
        this.slogan = slogan;
        this.lastOnline = lastOnline;
        this.messages = new Array();
    }

    Contact.prototype.addMessage = function(msg){
        this.messages.push(msg);
    }

    //revealing Module
    WhatsApp.Contact = Contact;
    return WhatsApp
})(WhatsApp||{});