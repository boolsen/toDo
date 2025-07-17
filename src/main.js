import { ToDoList, Item, CheckListItem } from "./ToDo.js";
import {Controller} from "./Controller.js"

let controller = new Controller();

controller.activeList.addItem(new Item('test'));
controller.activeList.addItem(new Item('toast'));
controller.activeList.addItem(new Item('hest'));
controller.activeList.addItem(new Item('tset'));

controller.drawActiveList();
controller.drawLists();