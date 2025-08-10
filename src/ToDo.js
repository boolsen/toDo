
class ToDoList {
    constructor(title) {
        this.title = title;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(itemID) {        
        const index = this.items.findIndex(arrayItem => arrayItem.id === itemID);        
        if (index > -1) {
            this.items.splice(index,1);
        }
    }

    editTitle(newTitle) {
        this.title = newTitle;
    }

    addCheckListItemToItem(itemID, text) {
        const index = this.items.findIndex(arrayItem => arrayItem.id === itemID);        
        if (index > -1) {
            this.items[index].addCheckListItem(text);
        }
    }
}

class Item {
    constructor(title){
        this.title = title;
        this.checkList = [];
        this.description = null;
        this.dueDate = null;
        this.notes = null;
        this.priority = 'low';
        this.id = crypto.randomUUID();
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
    
    removeCheckListItem(checkListItem){
        this.checkList = this.checkList.filter(item => item !== checkListItem);
    }

    checkListItemChangeStatus(checkListItem) {
        if (checkListItem.status){
            checkListItem.status = false;
        } else {
            checkListItem.status = true;
        }
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