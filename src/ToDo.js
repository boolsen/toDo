
class ToDoList {
    constructor(title) {
        this.title = title;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    editTitle(newTitle) {
        this.title = newTitle;
    }
}

class Item {
    constructor(title){
        this.title = title;
        this.checkList = [];
        this.description = null;
        this.dueDate = null;
        this.notes = null;
    }

    setDescription(description){
        this.description = description;
    }

    setDueDate(dueDate){
        this.dueDate = dueDate;
    }

    setNotes(notes) {
        this.notes = notes;
    }

    addCheckListItem(text) {
        this.checkList.push(new CheckListItem(text));
    }
}

class CheckListItem {
    constructor(text) {
        this.text = text;
        this.status = false;
        this.timeStamp = Date.now();
    }
}

export {ToDoList, Item, CheckListItem};