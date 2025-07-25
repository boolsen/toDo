import { ToDoList, Item, CheckListItem } from "./ToDo.js";
import {Controller} from "./Controller.js"
import './style.css';

let controller = new Controller();

controller.createTodoList('test');

let a = new Item('balle');
a.setDescription('this is a description, but I need it to be a bit longer to test some stuff. So Im just writing random stuff in here, and seeing what sticks.');
a.setDueDate('20.07.2025');
a.setNotes('This is a note');
a.addCheckListItem('check this');

controller.activeList.addItem(a);
controller.activeList.addItem(new Item('toast'));
controller.activeList.addItem(new Item('hest'));
controller.activeList.addItem(new Item('tset'));

controller.drawActiveList();
controller.drawLists();