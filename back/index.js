const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let claims = [];

app.get("/", (req, res) => {
  res.send("Test port");
});

app.post("/claims", (req, res) => {
  const { policyNo, claimNumber, claimInfo, claimAmount } = req.body;

  if (typeof claimAmount !== "number") {
    res.status(400).json({ message: "claim amount must be a number" });
    return;
  }

  if (typeof claimNumber !== "number") {
    res.status(400).json({ message: "claim number must be a number" });
    return;
  }

  if (!policyNo || !claimNumber || !claimInfo || !claimAmount) {
    res.status(400).json({ message: "please complete the form" });
    return;
  }

  const newClaim = {
    id: claims.length + 1,
    policyNo,
    claimNumber,
    claimInfo,
    claimAmount,
  };

  claims.push(newClaim);

  res.status(200).json({ message: "Claim Created", value: newClaim });
  return;
});

app.get("/claim/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const found = claims.find((claim) => claim.id === id);
  if (!found) {
    res.status(404).json({ message: "claim not found" });
  }
  res.status(200).json({ message: "Claim found", value: found });
  return;
});

app.listen(PORT, () => {
  console.log(`server running on Localhost:${PORT}`);
});
