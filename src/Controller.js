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

            let titleElement = document.createElement("h3");
            titleElement.classList.add("list-item-title");
            titleElement.innerText = item.title;

            container.append(titleElement);
            this.activeListContainer.append(titleElement)
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