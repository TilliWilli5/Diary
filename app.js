var app = (function(){
    //Результирующий экспорт
    let $ = {};
    $.diary = document.querySelector("#diary");
    new Diary().AttachTo($.diary);
    $.actionBar = document.querySelector("#diaryActionBar");
    new ActionBar().AttachTo($.actionBar);
    //Создаем записи заготовки чтобы было с чем работать
    let n1 = new Note("Note 1", "Description 1", "Tag1 Tag2 Tag3");
        n1.On("swipeUp", $.diary.ctrl.Delegate("InEventNoteSwipeUp"));
        n1.On("swipeDown", $.diary.ctrl.Delegate("InEventNoteSwipeDown"));
        n1.On("swipeLeft", $.diary.ctrl.Delegate("InEventNoteSwipeLeft"));
        n1.On("swipeRight", $.diary.ctrl.Delegate("InEventNoteSwipeRight"));
        n1.On("tap", $.diary.ctrl.Delegate("InEventNoteTap"));
        $.diary.querySelector("#noteList").appendChild(n1.Render());
    let n2 = new Note("Thought 2", "Description 1", "Tag1 Tag2 Tag3");
        n2.On("swipeUp", $.diary.ctrl.Delegate("InEventNoteSwipeUp"));
        n2.On("swipeDown", $.diary.ctrl.Delegate("InEventNoteSwipeDown"));
        n2.On("swipeLeft", $.diary.ctrl.Delegate("InEventNoteSwipeLeft"));
        n2.On("swipeRight", $.diary.ctrl.Delegate("InEventNoteSwipeRight"));
        n2.On("tap", $.diary.ctrl.Delegate("InEventNoteTap"));
        $.diary.querySelector("#noteList").appendChild(n2.Render());
    let n3 = new Note("Idea 3", "Description 1", "Tag1 Tag2 Tag3");
        n3.On("swipeUp", $.diary.ctrl.Delegate("InEventNoteSwipeUp"));
        n3.On("swipeDown", $.diary.ctrl.Delegate("InEventNoteSwipeDown"));
        n3.On("swipeLeft", $.diary.ctrl.Delegate("InEventNoteSwipeLeft"));
        n3.On("swipeRight", $.diary.ctrl.Delegate("InEventNoteSwipeRight"));
        n3.On("tap", $.diary.ctrl.Delegate("InEventNoteTap"));
        $.diary.querySelector("#noteList").appendChild(n3.Render());
    //Последняя строка
    return $;
})();