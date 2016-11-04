"use strict";
class Diary extends Emitter
{
    constructor(){
        super();
        this.view = null;
    }
    AttachTo(pShelter){
        pShelter.ctrl = this;
        this.view = pShelter;
        let eventName = document.body.ontouchstart?"touchstart":"click";
        this.AssignHandlers(".noteTitle", eventName, [this.NoteTitleClickHandler]);
    }
    AssignHandlers(pSelector = "", pEventName, pHandlerArray){
        let anchor = "id";
        if(pSelector[0] === ".")
        {
            anchor = "className";
            pSelector = pSelector.slice(1);
        }
        if(pSelector[0] === "#")
        {
            anchor = "id";
            pSelector = pSelector.slice(1);
        }
        for(let iX=0; iX<pHandlerArray.length; ++iX)
        {
            this.view.addEventListener(pEventName, function(pEvent){
                if(pEvent.target[anchor] === pSelector)
                    pHandlerArray[iX].call(this.ctrl, pEvent);
            });
        }
    }
    //Inner Methods
    NoteIndex(pNote){
        let noteList = util.FindParent(pNote, "#noteList", true);
        let noteIndex = Array.prototype.indexOf.call(noteList.children, pNote);
    }
    //Handlers
    NoteTitleClickHandler(pEvent){
        
    }
    //Outer Handlers - aka Inner Events - aka Methods for Delegation
    InEventNoteSwipeUp(pNote){
        this.OutEventNoteEdited(pNote);
    }
    InEventNoteSwipeDown(pNote){
        console.log(pNote);
    }
    InEventNoteSwipeLeft(pNote){
        console.log(pNote);
    }
    InEventNoteSwipeRight(pNote){
        this.OutEventNoteSelected(pNote);
    }
    //Events - aka Outer Events
    OutEventNoteEdited(pNote){
        let noteIndex = this.NoteIndex(pNote);
        let title = pNote.querySelector(".noteTitle").innerText;
        let desc = pNote.querySelector(".noteDesc").innerText;
        let tagField = pNote.querySelector(".noteTagField").innerText.split("#").splice(1);
        let noteInfo = {title, desc, tagField, noteIndex};
        this.Emit("noteEdited", noteInfo);
    }
    OutEventNoteSelected(pNote){
        let noteIndex = this.NoteIndex(pNote);
        this.Emit("noteSelected", noteIndex);
    }
}