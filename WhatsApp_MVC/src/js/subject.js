/**
 * Created by P23460 on 12.12.2016.
 */

var WhatsApp = (function(WhatsApp){
    function Subject() {
        //assoziativer Array mit Array
        this.observers = [];
    }

    Subject.prototype.subscribe = function(topic, listenerObj, callbackFct) {
        if(this.observers[topic]==undefined){
            this.observers[topic] = new Array();
        }
        this.observers[topic].push({
            obj: listenerObj,
            fct: callbackFct,
        });
    }

    Subject.prototype.notifyObservers=function(topic,param) {
        var observersForTopic = this.observers[topic];
        for(var i=0; i < observersForTopic.length;i++){
            observersForTopic[i].fct.call(observersForTopic[i].obj,param);
        }
    }

    WhatsApp.Subject = Subject;
    return WhatsApp;
})(WhatsApp || {});