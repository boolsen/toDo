import { ToDoList, Item, CheckListItem } from "./ToDo.js";

class Controller {
    constructor(){
        this.activeList = new ToDoList('Default');
        this.todoLists = [this.activeList];
        this.activeListContainer = document.querySelector('.current-list-container')
        this.availableListsContainer = document.querySelector('.available-lists');
        const self = this;
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

    resetActiveListContainer() {
        this.activeListContainer.innerHTML = '';
    }

    drawItem(item) {
        let container = document.createElement("div");
        container.classList.add("list-item");
        container.classList.add("list-item-collapsed");
        container.classList.add('before-list-item');

        let titleElement = document.createElement("h3");
        titleElement.classList.add("list-item-title");
        titleElement.classList.add('before-list-item');
        titleElement.innerText = item.title;
        container.append(titleElement);

        let descriptionElement = document.createElement('span');
        descriptionElement.classList.add('list-item-description');
        descriptionElement.classList.add('before-list-item');
        descriptionElement.innerText = item.description;
        container.append(descriptionElement);

        let dueDateElement = document.createElement('span');
        dueDateElement.classList.add('list-item-duedate');
        dueDateElement.classList.add('before-list-item');
        dueDateElement.innerText = item.dueDate;
        container.append(dueDateElement);

        let noteElement = document.createElement('em');
        noteElement.classList.add('list-item-note');
        noteElement.classList.add('before-list-item');
        noteElement.innerText = item.notes;
        container.append(noteElement);

        let checkListElement = document.createElement('ul');
        checkListElement.classList.add('list-item-checklist')
        checkListElement.classList.add('before-list-item');
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
        console.log(container);
        
        const icon = document.createElement('img');
        icon.classList.add('list-item-options-icon');
        container.append(icon);
        
        const optionsMenu = document.createElement('ul');
        optionsMenu.classList.add('list-item-options');
        
        const deleteItem = document.createElement('li');
        deleteItem.classList.add('list-item-delete');
        deleteItem.innerText = "Delete"
        deleteItem.onclick = () => {            
            console.log('delete test');
        };
        optionsMenu.append(deleteItem);

        const setPriority = document.createElement('li');
        setPriority.classList.add('list-item-set-priority');
        setPriority.innerText = "Set priority"
        setPriority.onclick = () => {            
            console.log('priority test');
        };
        optionsMenu.append(setPriority);

        /* const buttonElement = document.createElement('button')
        buttonElement.classList.add('list-item-remove');
        buttonElement.innerText = "Delete";
        buttonElement.onclick = () => {            
            this.activeList.removeItem(item.id);
            this.resetActiveListContainer();
            this.drawActiveList();
        };
        container.append(buttonElement); */

        container.append(optionsMenu);

        this.activeListContainer.append(container)
    }

    drawLists() {
        const listlistElement = document.createElement('ul');
        listlistElement.classList.add('list-list')

        for (const list of this.todoLists) {
            listlistElement.append(this.drawList(list));
        }        
        
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