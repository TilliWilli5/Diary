"use strict";
class Diary extends Emitter
{
    constructor(){
        super();
        this.view = null;
        this.selectionMask = [];
    }
    AttachTo(pShelter){
        pShelter.ctrl = this;
        this.view = pShelter;
        let eventName = document.body.ontouchstart?"touchstart":"click";
        // this.AssignHandlers(".noteTitle", eventName, [this.NoteTitleClickHandler]);
        this.AssignHandlers("#diaryDeleteBtn", eventName, [this.DiaryDeleteBtnClick]);
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
        return Array.prototype.indexOf.call(noteList.children, pNote);
    }
    HasSelection(){
        for(let status of this.selectionMask)
            if(status)
                return true;
        return false;
    }
    //Inner Handlers
    DiaryDeleteBtnClick(pEvent){
        let notes = this.view.querySelector("#noteList").children;
        //Идем с конца чтобы можно было безболезненно вырезать удаленный элементы из селекшена
        for(let iX=notes.length-1;iX>=0;--iX)
            if(this.selectionMask[iX])
            {
                notes[iX].parentNode.removeChild(notes[iX]);
                //Тут же вырезаем из селекшена
                this.selectionMask.splice(iX);
            }
        this.view.querySelector("#diaryActionBar").ctrl.Hide();
    }
    //Outer Handlers - aka Inner Events - aka Methods for Delegation
    InEventNoteSwipeUp(pNote){
        this.OutEventNoteEdited(pNote);
    }
    InEventNoteSwipeDown(pNote){
        console.log(pNote);
    }
    InEventNoteSwipeLeft(pNote){
        // console.log(pNote);
        pNote.querySelector(".noteHandle").style.display = "none";//Эту строчку можно выполнить в контроллере Note
        this.selectionMask[this.NoteIndex(pNote)] = false;
        if(this.HasSelection() === false)
            this.view.querySelector("#diaryActionBar").ctrl.Hide();
    }
    InEventNoteSwipeRight(pNote){
        // this.OutEventNoteSelected(pNote);
        pNote.querySelector(".noteHandle").style.display = "initial";//Эту строчку можно выполнить в контроллере Note
        this.view.querySelector("#diaryActionBar").ctrl.Show();
        this.selectionMask[this.NoteIndex(pNote)] = true;
    }
    InEventNoteTap(pNote){
        //Скрываем все (по идее должен быть только один) открытые записи
        var notes = this.view.querySelector("#noteList").children;
        for(var note of notes)
            if(note !== pNote)
                note.ctrl.Fold();
        pNote.ctrl.Toogle();
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
    // OutEventNoteSelected(pNote){
    //     let noteIndex = this.NoteIndex(pNote);
    //     this.Emit("noteSelected", noteIndex);
    // }
}