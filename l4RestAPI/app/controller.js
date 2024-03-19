import { addTask, deleteTask, getall, getTaskById, tasks, updateTask } from "./taskmodel.js";

export const controller = {
    add: (body) => {
        return addTask(body);
    },
    delete: (id) => {
        return deleteTask(id);
    },
    update: (body) => {
        return updateTask(body);
    },
    getall: () => {
        return getall();
    },
    getbyid: (id) => {
        return getTaskById(id);
    },
};
