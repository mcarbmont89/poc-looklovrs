const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

require('dotenv').config()

const fs = require('fs')
const multer = require('multer')
const { OpenAI } = require('openai')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file')
let filePath

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }
        filePath = req.file.path
        console.log(filePath)
    })
})

app.post('/vision', async (req, res) => {
    try {
        console.log('sent to vision')
        // const imageAsBase64 = fs.readFileSync("public/1715260546477-mihaly2222-koles-5V-W4zTqZ74-unsplash.jpg", 'base64')
        // const image_url = `data:image/jpeg;base64,${fs.readFileSync("public/1715260546477-mihaly2222-koles-5V-W4zTqZ74-unsplash.jpg", 'base64')}`
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "image_url",
                            image_url: `data:image/jpeg;base64,${fs.readFileSync("public/resized1.jpeg", 'base64')}`
                        },
                        {
                            type: "image_url",
                            image_url: `data:image/jpeg;base64,${fs.readFileSync("public/resized2.jpeg", 'base64')}`
                        },
                        {
                            type: "image_url",
                            image_url: `data:image/jpeg;base64,${fs.readFileSync("public/resized3.jpeg", 'base64')}`
                        },
                        {
                            type: "image_url",
                            image_url: `data:image/jpeg;base64,${fs.readFileSync("public/resized4.jpeg", 'base64')}`
                        },
                        {
                            type: "image_url",
                            image_url: `data:image/jpeg;base64,${fs.readFileSync("public/resized5.jpeg", 'base64')}`
                        },
                        { type: "text", text: "Crea las mejores combinaciones para vestirme con la ropa de mi guardarropas. Dame la respuesta en un formato simple pero bonito para mostrar" },
                        { type: "text", text: req.body.message },
                    ],
                },
            ],
        });
        res.send(response.choices[0].message.content)
    }
    catch (error) {
        console.error(error)
    }
})

app.listen(8000, () => `App listening on port 8000`)
