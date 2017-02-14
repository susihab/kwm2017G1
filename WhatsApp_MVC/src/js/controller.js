/**
 * Created by p23460 on 14.12.2016.
 */
/**
 * Created by P23460 on 12.12.2016.
 */
var WhatsApp = (function(WhatsApp,Model,View){

    var currentContact;

    function init(){
        console.log("Init of Controller");
        var dom = View.getDOM();
        dom.contacts.on("click","li",function(){
            handleContactClick(this)
        });

        dom.input.keyup(function(ev){
            console.log("key pressed");
            if (ev.which == 13 || ev.keyCode == 13) {
                addMessage($(this).val(),1);
                $(this).val("");
            }
        })
    };

    function handleContactClick(htmlContact){
        var userId = $(htmlContact).attr("id");
        console.log("Clicked on user with id " + userId);
        var contact = Model.getContactToId(userId);
        setActiveContact(contact);
        View.renderExistingMessagesToContact(contact);
        View.getDOM().inputBar.show();
    }

    //type: 1 = own message, 0 = foreign Message
    function addMessage(text,type){
        Model.addMessage(getActiveContact(),text,type);
    }

    function setActiveContact(contact){
        currentContact = contact;
    }

    function getActiveContact(contact){
        return currentContact;
    }

    //register listener
    Model.addInitListener(this,init);

    var controller = {
        addMessage:addMessage,
        setContact : setActiveContact,
        getContact : getActiveContact
    };

    WhatsApp.Controller = controller;
    return WhatsApp;
})(WhatsApp,WhatsApp.Model,WhatsApp.View);
