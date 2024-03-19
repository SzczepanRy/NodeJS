export let tasks = [
    {
        id: 1,
        title: "zadanie 1",
        description: "łatwe",
        completed: false,
    },
    {
        id: 2,
        title: "zadanie 2",
        description: "trudne",
        completed: false,
    },
    {
        id: 3,
        title: "zadanie 3",
        description: "średnie",
        completed: false,
    },
];

export const deleteTask = (id) => {
    try {
        tasks = tasks.filter((el) => {
            if (el.id != id) {
                return el;
            }
        });
        return { status: "deleted task", tasks: tasks };
    } catch (err) {
        return { status: "error : " + err };
    }
};

export const getall = () => {
    try {
        return { status: "all tasks", tasks };
    } catch (err) {
        return { status: "error : " + err };
    }
};

export const addTask = (body) => {
    try {
        body = JSON.parse(body);
        body["id"] = tasks[tasks.length - 1].id + 1;
        tasks.push(body);

        return { status: "deleted tasks", tasks: tasks };
    } catch (err) {
        return { status: "error : " + err };
    }
};
export const getTaskById = (id) => {
    try {
        let res = tasks.filter((el) => {
            if (el.id == id) {
                return el;
            }
        });
        if (res) {
            return { status: "task found", tasks: res };
        } else {
            return { status: "task not found", tasks };
        }
    } catch (err) {
        return { status: "error : " + err };
    }
};

export const updateTask = (body) => {
    try {
        body = JSON.parse(body);

        let changedObjects = 0;
        tasks = tasks.map((el) => {
            if (el.id != body.id) {
                return el;
            } else {
                console.log(el.id, body.id);
                changedObjects++;

                return body;
            }
        });

        if (changedObjects > 0) {
            return { status: "updated tasks", tasks: tasks };
        } else {
            return { status: "did not update tasks", tasks: tasks };
        }
    } catch (err) {
        return { status: "error : " + err };
    }
};
