import { ToDoList, Item, CheckListItem } from "./ToDo.js";

class Controller {
    constructor(){
        this.activeList = new ToDoList('Default');
        this.todoLists = [this.activeList];
        this.activeListContainer = document.querySelector('.current-list-container')
        this.availableListsContainer = document.querySelector('.available-lists');
    }

    createTodoList(title) {
        this.activeList = new ToDoList(title);
        this.todoLists.push(this.activeList);
    }

    drawActiveList() {
        for (const item of this.activeList.items) {
            this.drawItem(item);
        }
    }

    drawItem(item) {
        let container = document.createElement("div");
            container.classList.add("list-item");
            container.classList.add('before-title');

            let titleElement = document.createElement("h3");
            titleElement.classList.add("list-item-title");
            titleElement.innerText = item.title;
            container.append(titleElement);

            let descriptionElement = document.createElement('span');
            descriptionElement.classList.add('list-item-description');
            descriptionElement.innerText = item.description;
            container.append(descriptionElement);

            let dueDateElement = document.createElement('span');
            dueDateElement.classList.add('list-item-duedate');
            dueDateElement.innerText = item.dueDate;
            container.append(dueDateElement);

            let noteElement = document.createElement('em');
            noteElement.classList.add('list-item-note');
            noteElement.innerText = item.notes;
            container.append(noteElement);

            let checkListElement = document.createElement('ul');
            checkListElement.classList.add('list-item-checklist')
            for (const checkListItem of item.checkList) {
                const element = document.createElement('li');
                element.classList.add('checklist-item')
                const textElement = document.createElement('span');
                textElement.innerText = checkListItem.text;
                const buttonElement = document.createElement('button');
                buttonElement.innerText = 'X';
                element.append(textElement);
                element.append(buttonElement);
                checkListElement.append(element);
                console.log(checkListItem);
                                
            }
            container.append(checkListElement);

            this.activeListContainer.append(container)
    }

    drawLists() {
        const listlistElement = document.createElement('ul');
        listlistElement.classList.add('list-list')

        for (const list of this.todoLists) {
            listlistElement.append(this.drawList(list));
        }
        console.log(listlistElement);
        
        
        this.availableListsContainer.append(listlistElement);
    }

    drawList(list) {
        const listElement = document.createElement('li');
        listElement.classList.add('list-element');
        listElement.innerText = list.title;
        return listElement;        
    }

}

let controller = new Controller();

export {Controller, ToDoList, Item, CheckListItem}