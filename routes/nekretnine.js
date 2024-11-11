import express from "express"

const router = express.Router();

const nekretnine = [
    {id: 1 , naziv: "Dvosobni stan", opis:"Iz 80-tih godina, obnovljen",  lokacija: "Pula" , brojSoba: 2 , povrsina: 58, cijena: 98000 },
    {id: 2 , naziv: "Penthouse", opis:"Novogradnja",  lokacija: "Labin" , brojSoba: 8 , povrsina: 142, cijena: 283000 },
    {id: 3 , naziv: "Studio apartman", opis:"New York style",  lokacija: "Pula" , brojSoba: 1 , povrsina: 18, cijena: 50000 },
    {id: 4 , naziv: "Jednosobni stan", opis:"Iz 60-tih godina, povoljna lokacija",  lokacija: "Pazin" , brojSoba: 1 , povrsina: 43, cijena: 70000 },
]
router.get("/", (req, res) => {
    return res.status(200).json(nekretnine);
});
router.get('/:id', (req,res)=>{
    const id_nekretnine = req.params.id
    const trazenaNekretnina = nekretnine.find(n => n.id == id_nekretnine)

    if (isNaN(id_nekretnine)){
        return res.status(400).json({message:"ID nije valjan"})
    }
    if (!trazenaNekretnina){
        return res.status(404).json({message: "Nekretnina nije pronađena"})
    }
    return res.status(200).json(trazenaNekretnina)
});

router.post("/dodaj", (req,res)=>{
    const novaNekretnina = req.body
    const kljucevi = Object.keys(novaNekretnina)

    if (!(kljucevi.includes("naziv") && kljucevi.includes("opis") && kljucevi.includes("lokacija") 
        && kljucevi.includes("brojSoba") && kljucevi.includes("povrsina") && kljucevi.includes("cijena"))){
    return res.send.status(400).json({message: "Nisu navedeni svi podaci"})
    }

    nekretnine.push(novaNekretnina)
    return res.status(200).json(nekretnine)
})
router.put("/zamijeni/:id",(req,res)=>{
    const id_nekretnine = req.params.id
    const updatedNekretnina = req.body
   
    if (isNaN(id_nekretnine)){
        return res.status(400).json({message:"ID nije valjan"})
    }
    const index = nekretnine.find(n => n.id == id_nekretnine)
    if (!index){
        return res.status(404).json({message: "Nekretnina nije pronađena"})
    }
    nekretnine[index] = updatedNekretnina
    return res.status(200).json(`Nekretnina je uređena`)
})


router.patch("/uredi/:id",(req,res)=>{
    const id_nekretnine = req.params.id
    const updatedNekretnina = req.body
   
    if (isNaN(id_nekretnine)){
        return res.status(400).json({message:"ID nije valjan"})
    }
    const index = nekretnine.find(n => n.id == id_nekretnine)
    if (index == -1){
        return res.status(404).json({message: "Nekretnina nije pronađena"})
    }
    const kljucevi = Object.keys(updatedNekretnina)
    for (let k of kljucevi){
        if(nekretnine[index][k] != updatedNekretnina[k]){
            nekretnine[index][k] = updatedNekretnina[k]
        }else {
            nekretnine[index] = updatedNekretnina
        }
    }
    return res.status(200).json({message: "Nekretnina je uređena", azuriraniPodatak: updatedNekretnina})
})



export default router