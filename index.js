import express from "express"
const app = express();
const PORT = 3000;
app.get("/", async (req, res) => {
    // 794 ms to bring the response
    await fetch('https://jsonplaceholder.typicode.com/posts').
        then((response) => {
            if (!response.ok) {
                throw new Error
            }
            return response.json()
        }).then((data) => {
            res.json({ data })
        }).catch((err) => {
            console.log(err)
        })

    console.log(response)

})

app.listen(PORT, () => {
    console.log(`Server is listening at ${3000}`)
})