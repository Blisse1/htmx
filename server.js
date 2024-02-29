import express from "express";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get("/users", async (req, res) => {
    setTimeout(async() => {
        const limit = Number(req.query.limit);
        console.log(limit);
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
        const users = await response.json();

        res.send(`
            <h1 class="text-2xl font-bold my-4">Users</h1>
            <ul>
            ${users.map((user) => `<li>${user.name}</li>`).join("")}
            </ul>
            `)
    }, 2000)
});

// Handle POST request
app.post("/convert", (req, res) => {
    setTimeout(() => {
        const fahrenheit = parseFloat(req.body.fahrenheit);
        const celsius = (fahrenheit - 32) * (5 / 9);
        res.send(`<p>${fahrenheit} degrees Fahrenheit is equal to ${celsius.toFixed(2)} degrees Celsius</p>`
        );
    }, 1000);
})
let counter = 0;
app.get("/temperature", (req, res) => {
    counter++;
    const data = {data: counter}
    res.json(data);
})

app.listen(3000, () => {
    console.log("Server listening to port 3000");
});
