class Note extends Emitter
{
    constructor(pTitle, pDesc, pTags){
        super();
        this.view = null;
        this.isHidden = true;
        this.isFolded = true;
        this.title = pTitle;
        this.desc = pDesc;
        this.tags = pTags;
    }
    Render(){
        let theView = document.createElement("div");
        this.view = theView;
        theView.ctrl = this;
        theView.className = "note";
        //Assigning handlers
        let eventName = document.body.ontouchstart?"touchstart":"click";
        this.AssignHandlers(".noteTitle", eventName, [this.NoteBodyClickHandler]);
        let hammerManager = new Hammer.Manager(this.view, {
            recognizers:[
                [Hammer.Swipe, {direction:Hammer.DIRECTION_ALL}]
            ]
        });
        hammerManager.on("swipe", function(pEvent){
            let note = util.FindParent(pEvent.target, ".note", true);
            switch(pEvent.direction)
            {
                case Hammer.DIRECTION_UP:note.ctrl.Emit("swipeUp", note);break;
                case Hammer.DIRECTION_DOWN:note.ctrl.Emit("swipeDown", note);break;
                case Hammer.DIRECTION_LEFT:note.ctrl.Emit("swipeLeft", note);break;
                case Hammer.DIRECTION_RIGHT:note.ctrl.Emit("swipeRight", note);break;
            }
        });
            let theHandle = document.createElement("div");
            theHandle.className = "noteHandle";
        theView.appendChild(theHandle);
            let theBody = document.createElement("div");
            theBody.className = "noteBody";
                let theTitle = document.createElement("div");
                theTitle.className = "noteTitle";
                theTitle.innerHTML = this.title;
                let theDesc = document.createElement("div");
                theDesc.className = "noteDesc";
                theDesc.innerHTML = this.desc;
                let theTagField = document.createElement("div");
                theTagField.className = "noteTagField";
                theTagField.innerHTML = this.tags;
            theBody.appendChild(theTitle);
            theBody.appendChild(theDesc);
            theBody.appendChild(theTagField);
        theView.appendChild(theBody);
        return theView;
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
    NoteBodyClickHandler(pEvent){
        util.FindParent(pEvent.target, ".note").ctrl.Expand();
    }
    //Events
    //Aux
    Show(){

    }
    Hide(){

    }
    Expand(){
        let desc = this.view.querySelector(".noteDesc");
        let tagField = this.view.querySelector(".noteTagField");
        // let noteDesc = pEvent.target.nextElementSibling;
        // if(noteDesc.style.display === "none" || noteDesc.style.display === "")
        if(desc.style.animationName === "yScaleDown" || desc.style.animationName === "")
        {
            desc.style.display = "initial";
            tagField.style.display = "initial";
            desc.style.animation = "yScaleUp 0.3s forwards";
            tagField.style.animation = "yScaleUp 0.3s forwards ease-out";
        }
        else
        {
            // noteDesc.style.display = "none";
            // noteDesc.nextElementSibling.style.display = "none";
            desc.style.animation = "yScaleDown 0.3s reverse forwards";
            tagField.style.animation = "yScaleDown 0.3s reverse forwards ease-out";
        }
    }
    Fold(){
        let desc = this.view.querySelector(".noteDesc");
        let tagField = this.view.querySelector(".noteTagField");
        if(desc.style.animationName === "yScaleUp")
        {
            desc.style.animation = "yScaleDown 0.3s reverse forwards";
            tagField.style.animation = "yScaleDown 0.3s reverse forwards ease-out";
        }
    }
}