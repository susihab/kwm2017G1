/**
 * Created by P23460 on 12.12.2016.
 */
var WhatsApp = (function(WhatsApp,Model){

    const DOM = {
        contacts: $(".contact-list"),
        chat: $(".chat-list"),
        input : $("#input"),
        inputBar : $("section.chat .input-bar")
    }

    function init(param){
        console.log("Init of View");
        //var list = Model.getContactList();
        DOM.inputBar.hide();
        renderContactList(param.contacts);
    };


    function renderContactList(list){
        var html="";
        for(var i=0; i< list.length;i++){
            var contact = list[i];
            html+='<li id="'+ contact.id+'" class="contact-entry">' +
                '<img src="'+contact.image+'" class="avatar">' +
                '<div class="content">' +
                '<h5 class="name">'+contact.username+'</h5>' +
                '<p>'+contact.slogan+'</p> ' +
                '</div> ' +
                '<div class="time">'+contact.lastOnline+'</div> ' +
                '</li>';
        }
        DOM.contacts.html(html);
    }

    function renderMessages(contact){
        var html = "";
        for(var i=0; i < contact.messages.length;i++){
            html+=getHTMLToSingleMessage(contact.messages[i],contact.username);
        }
        DOM.chat.html(html);
    }

    function getHTMLToSingleMessage(msg,username){
        var mine = msg.type==1?" mine":"";
        var img = msg.image?'<img src="'+msg.image+'">':'';
        var user = msg.type==0?'<h4 class="name">'+username+'</h4>':'';

        var msgHTML = '<div class="chat-bubble'+mine+'">' +
            '<div class="mouth"></div>' + user +
            '<div class="content">' + img + msg.text+
            '</div>        ' +
            '<div class="time">'+msg.time+'</div>' +
            '</div>';
        return msgHTML;
    }

    function addMessage(param){
        var htmlMsg = getHTMLToSingleMessage(param.msg,param.contact.username);
        DOM.chat.append($(htmlMsg));
    }


    //register listener
    Model.addInitListener(this,init);
    Model.addMessageListener(this,addMessage);


    var view = {
        getDOM: function() {return DOM; },
        renderExistingMessagesToContact : renderMessages
    };

    WhatsApp.View = view;
    return WhatsApp;
})(WhatsApp,WhatsApp.Model);
