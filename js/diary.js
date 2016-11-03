"use strict";
class Diary
{
    constructor(){
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
    //Handlers
    NoteTitleClickHandler(pEvent){
        
    }
    //Events
    ExpandNote(pNote){
        let noteDesc = pEvent.target.nextElementSibling;
        // if(noteDesc.style.display === "none" || noteDesc.style.display === "")
        if(noteDesc.style.animationName === "yScaleDown" || noteDesc.style.animationName === "")
        {
            noteDesc.style.display = "initial";
            noteDesc.nextElementSibling.style.display = "initial";
            noteDesc.style.animation = "yScaleUp 0.3s forwards";
            noteDesc.nextElementSibling.style.animation = "yScaleUp 0.3s forwards ease-out";
        }
        else
        {
            // noteDesc.style.display = "none";
            // noteDesc.nextElementSibling.style.display = "none";
            noteDesc.style.animation = "yScaleDown 0.3s reverse forwards";
            noteDesc.nextElementSibling.style.animation = "yScaleDown 0.3s reverse forwards ease-out";
        }
    }
    FoldNote(pNote){

    }
    //Aux
    
}