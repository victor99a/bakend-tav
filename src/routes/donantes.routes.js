const express = require("express");
const {
  readDonantes,
  findByRut,
  addDonante,
  deleteByRut
} = require("../services/donantes.service");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(readDonantes());
});

router.get("/:rut", (req, res) => {
  const d = findByRut(req.params.rut);
  if (!d) return res.status(404).json({ error: "No encontrado" });
  res.json(d);
});

router.post("/", (req, res) => {
  if (!addDonante(req.body)) {
    return res.status(409).json({ error: "RUT duplicado" });
  }
  res.status(201).json(req.body);
});

router.delete("/:rut", (req, res) => {
  if (!deleteByRut(req.params.rut)) {
    return res.status(404).json({ error: "No encontrado" });
  }
  res.status(204).send();
});

module.exports = router;