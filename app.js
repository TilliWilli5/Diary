var app = (function(){
    //Результирующий экспорт
    let $ = {};
    $.diary = document.querySelector("#diary");
    new Diary().AttachTo($.diary);
    $.diary.querySelector("#noteList").appendChild(new Note("Title 1", "Description 1", "Tag1 Tag2 Tag3").Render());
    $.diary.querySelector("#noteList").appendChild(new Note("Thought 2", "Description 2", "Tag4 Tag5 Tag6").Render());
    $.diary.querySelector("#noteList").appendChild(new Note("Idea 3", "Description 3", "Tag7 Tag8 Tag9").Render());
    //Последняя строка
    return $;
})();