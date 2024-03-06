const cont = document.querySelector(".container");
const getData = async () => {
    const res = await fetch("http://localhost:3000/data");
    const data = await res.text();
    return JSON.parse(data);
};

async function addBar() {
    let data = [];
    return new Promise((resolve, reject) => {
        setInterval(async () => {
            const { totalmem, usedmem } = await getData();
            let max = document.querySelector(".max");

            console.log({ totalmem, usedmem });
            let height = usedmem;
            let bar = document.createElement("div");

            if (cont.children.length > 20) {
                cont.firstElementChild.remove();
                data.unshift();
            }

            bar.style.width = "10px";

            data.push(parseInt(height / 10000) / 2);

            bar.style.height = parseInt(height / 10000) / 2 + "px";

            let arr = [...data].sort((a, b) => a - b);
            let maxHeight = arr[arr.length - 1];
            console.log(maxHeight);
            max.style.top = 500 - maxHeight - 20 + "px";

            cont.append(bar);
        }, 1000);
    });
}
async function go() {
    let vart = await addBar();
    console.log(vart);
}
window.addEventListener("load", () => {
    go();
});
