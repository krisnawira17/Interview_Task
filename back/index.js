const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json())

let claims = []
const authorize = true

app.get("/" ,(req, res) => {
    res.send("Test port")
})

app.post("/claims", (req, res) =>{
    const {policyNo, claimNumber, claimInfo, claimAmount} = req.body
    if(!authorize){
        return res.status(401).json({message: "Unauthorized action"})
    }

    if(!policyNo){
        return res.status(401).json({message: "please input policy number"})
    }
    const newClaim = {
        id: claims.length + 1,
        claimNumber: claimNumber,
        claimInfo: claimInfo,
        claimAmount: claimAmount
    }
    claims.push(newClaim)
    console.log(newClaim)

    return res.send(200).json({message: "Claim Created", value: newClaim})
})

app.get("/claim/:id", (req, res) => {
    const id = req.params.id

    const search = claims.find( claim => claim.id === id)
    if (!search){
        res.send(404).json({message: "claim not found"})
    }
})

app.listen(PORT, () =>{
    console.log(`server running on Localhost:${PORT}`)
})