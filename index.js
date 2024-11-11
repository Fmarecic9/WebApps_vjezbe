import express from "express"
const PORT = 3001;

const app = express();

import nekretnineRouter from './routes/nekretnine.js';

app.use(express.json());
app.use('/nekretnine', nekretnineRouter);

app.listen(PORT, (error) => {
    if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
    }
    });

app.get('/', (req,res)=>{
    res.json("TEST")
})