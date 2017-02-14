/**
 * Created by P23460 on 12.12.2016.
 */
var WhatsApp =(function(WhatsApp,Subject,Contact,Message){

    const fileName = "js/whatsApp.json";
    var contactList = new Array();
    var subject = new Subject();


    function loadContactsFromFile(){
        console.log("laoding data");
        $.getJSON(fileName, function(data) { //asynchronous call!!
            console.log(data); // this will show the info it in firebug console
            for(var i =0;i<data.contacts.length;i++){
                var elem = data.contacts[i];
                var contact = new Contact(elem.id,elem.username,elem.image, elem.slogan, elem.lastOnline);
                loadMessage(contact,elem);
                contactList.push(contact);
            }

            //throw event
            subject.notifyObservers("onInit",{contacts:contactList});
        });
    }

    function loadMessage(contact,elem){
        for(var j=0; j < elem.messages.length;j++){
            var msg = elem.messages[j];
            var message = new Message(msg.text,msg.image,msg.time,msg.type);
            contact.addMessage(message);
        }
    }

    function addInitListener(obj,fct){
        subject.subscribe("onInit",obj,fct);
    }

    function addMessageListener(obj,fct){
        subject.subscribe("addMessage",obj,fct);
    }

    function getContactList(){
        return contactList;
    }

    function getContactToId(userId){
        for(var i=0;i<contactList.length;i++){
            if(contactList[i].id==userId){
                return contactList[i];
            }
        }
        return undefined;
    }

    function addMessageToContact(contact, text,type){
        var currentDate = new Date();
        var datetime = currentDate.getHours() + ":" + currentDate.getMinutes() ;
        var msg = new Message(text,null,datetime,type);
        contact.addMessage(msg);

        //throw event
        subject.notifyObservers("addMessage",{contact:contact,msg:msg});
    }

    loadContactsFromFile();

    var Model = {
        addInitListener : addInitListener,
        addMessageListener: addMessageListener,
        getContactList : getContactList,
        getContactToId : getContactToId,
        addMessage : addMessageToContact
    }
    WhatsApp.Model = Model;
    return WhatsApp
})(WhatsApp,WhatsApp.Subject,WhatsApp.Contact,WhatsApp.Message);