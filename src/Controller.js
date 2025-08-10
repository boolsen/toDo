import { ToDoList, Item, CheckListItem } from "./ToDo.js";

class Controller {
    constructor(){
        this.activeList = new ToDoList('Default');
        this.todoLists = [this.activeList];
        this.activeListContainer = document.querySelector('.current-list-container')
        this.availableListsContainer = document.querySelector('.available-lists');
        this.addItemModalContainer = document.querySelector('.add-item-modal-container');
        const self = this;
        document.querySelector('.add-item-btn').onclick = () => {  
            this.addItemToActiveList();
        }
    }

    createTodoList(title) {
        this.activeList = new ToDoList(title);
        this.todoLists.push(this.activeList);
    }

    drawActiveList() {
        const expanded = this.findAllExpandedListItems();
        
        this.resetActiveListContainer(); // Rewrite to create full element that is returned to this function and only remove content when drawing full new one?
        const addItemBtn = document.createElement('button');
        addItemBtn.classList.add('add-item');
        addItemBtn.innerText = "Add item";
        /* Open modal to add item */
        addItemBtn.onclick = () => {              
            this.addItemModalContainer.classList.remove('hidden');
        }
        this.activeListContainer.append(addItemBtn);
        for (const item of this.activeList.items) {            
            this.drawItem(item, expanded);
        }
    }

    resetActiveListContainer() {
        this.activeListContainer.innerHTML = '';
    }

    drawItem(item, expanded) {
        let container = document.createElement("div");
        container.classList.add("list-item");
        
        if (expanded.length < 1 || !expanded.includes(item.id)){
            container.classList.add("list-item-collapsed");
        }

        container.dataset.id = item.id;
        container.addEventListener('click', (event) => {
            if (event.target === event.currentTarget) {
                this.expandItem(event.target);
            }
        });
        container.classList.add(item.priority);
        

        let titleElement = document.createElement("input");
        titleElement.type = 'text';
        titleElement.classList.add("list-item-title");
        titleElement.value = item.title;
        container.append(titleElement);

        let descriptionElement = document.createElement('textarea');
        descriptionElement.classList.add('list-item-description');
        descriptionElement.value = item.description;
        descriptionElement.rows = 5;
        container.append(descriptionElement);

        let dueDateElement = document.createElement('input');
        dueDateElement.classList.add('list-item-duedate');
        dueDateElement.type = 'date';
        dueDateElement.value = item.dueDate;
        container.append(dueDateElement);

        let noteElement = document.createElement('input');
        noteElement.classList.add('list-item-note');
        noteElement.type = 'textarea'
        noteElement.value = item.notes;
        container.append(noteElement);

        let checkListElement = document.createElement('ul');
        checkListElement.classList.add('list-item-checklist')
        const addButton = document.createElement('button');
        addButton.innerText = "add checklist-item";
        addButton.classList.add('add-button');
        addButton.onclick = () => {
            this.activeList.addCheckListItemToItem(item.id, 'testing');
            this.drawActiveList();
        }
        checkListElement.append(addButton);
        for (const checkListItem of item.checkList) {
            const element = document.createElement('li');
            element.classList.add('checklist-item')
            const textElement = document.createElement('span');
            textElement.innerText = checkListItem.text;
            const changeStatusCheckItemButton = document.createElement('button');
            changeStatusCheckItemButton.classList.add('change-status-checklist-item');
            if (checkListItem.status) {
                changeStatusCheckItemButton.classList.add('finished');
            } 
            changeStatusCheckItemButton.innerText = 'V'
            changeStatusCheckItemButton.onclick = () => {
                item.checkListItemChangeStatus(checkListItem);
                console.log(checkListItem.status);
                
                this.drawActiveList();
            }
            const addCheckItemButton = document.createElement('button');
            addCheckItemButton.innerText = 'X';
            addCheckItemButton.classList.add('remove-checklist-item');
            addCheckItemButton.onclick = () => {
                item.removeCheckListItem(checkListItem);
                this.drawActiveList();
            }
            element.append(textElement);
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('chekclist-buttons')
            buttonDiv.append(changeStatusCheckItemButton);
            buttonDiv.append(addCheckItemButton);
            element.append(buttonDiv);
            checkListElement.append(element);                            
        }
        container.append(checkListElement);

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('list-item-options-container');
        
        const icon = document.createElement('div');
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'
        icon.classList.add('list-item-options-icon');
        optionsContainer.append(icon);
        
        const optionsMenu = document.createElement('ul');
        optionsMenu.classList.add('list-item-options');
        
        const deleteItem = document.createElement('li');
        deleteItem.classList.add('list-item-delete');
        deleteItem.innerText = "Delete"
        deleteItem.onclick = () => {            
            this.activeList.removeItem(item.id);
            this.drawActiveList();
        };
        optionsMenu.append(deleteItem);

        const setPriority = document.createElement('li');
        setPriority.classList.add('list-item-set-priority');
        setPriority.innerText = "Set priority"
        optionsMenu.append(setPriority);

        const priorities = document.createElement('ul');
        priorities.classList.add('priorities');

        const high = document.createElement('li');
        high.classList.add('priority','high');
        high.innerText = 'High';
        high.onclick = () => {            
            item.priority = 'high';
            this.drawActiveList();
        };
        priorities.append(high)

        const medium = document.createElement('li');
        medium.classList.add('priority','medium');
        medium.innerText = 'Medium';
        medium.onclick = () => {            
            item.priority = 'medium';
            this.drawActiveList();
        };
        priorities.append(medium)

        const low = document.createElement('li');
        low.classList.add('priority','low');
        low.innerText = 'Low';
        low.onclick = () => {            
            item.priority = 'low';
            this.drawActiveList();
        };
        priorities.append(low)
            
        optionsMenu.append(priorities);
        optionsContainer.append(optionsMenu);
        container.append(optionsContainer);

        this.activeListContainer.append(container)
    }

    expandItem(element) {
        element.classList.toggle('list-item-collapsed');
    }

    drawLists() {
        const listlistElement = document.createElement('ul');
        listlistElement.classList.add('list-list')

        for (const list of this.todoLists) {
            listlistElement.append(this.drawList(list));
        }        
        
        this.availableListsContainer.append(listlistElement);
    }

    changePriority(item, priority) {
        item.priority = priority;
    }

    drawList(list) {
        const listElement = document.createElement('li');
        listElement.classList.add('list-element');
        listElement.innerText = list.title;
        return listElement;        
    }

    addItemToActiveList() {
        const inputs = this.addItemModalContainer.querySelectorAll('input');
        const priorityElement = this.addItemModalContainer.querySelector('select');
        
        const inputValues = {};
        inputs.forEach(input =>     {
            inputValues[input.name || input.className || input.id] = input.value;
        });        

        if (inputValues.title === "") {
            document.querySelector('.values-required-text').classList.remove('hidden');
            return
        }
        
        this.addItemModalContainer.classList.add('hidden');
        document.querySelector('.values-required-text').classList.add('hidden');

        let priorityValue = priorityElement.value;
        if (priorityValue === "") {
            priorityValue = "low";
        }        
        
        inputs.forEach(input => {
            input.value = '';
        });
        priorityElement.selectedIndex = -1;
        
        const newItem = new Item(inputValues["title"]);
        newItem.description = inputValues.description;
        newItem.notes = inputValues.notes;
        newItem.dueDate = inputValues.duedate;
        newItem.priority = priorityValue;
        
        this.activeList.addItem(newItem);    
        this.drawActiveList();        

    }

    findAllExpandedListItems(){
        const expanded = this.activeListContainer.querySelectorAll('.list-item:not(.list-item-collapsed)');
        let expandedIds = [];
        expanded.forEach(element => {
            expandedIds.push(element.dataset.id);
        });      
        return expandedIds;
    }

}

let controller = new Controller();

export {Controller, ToDoList, Item, CheckListItem}