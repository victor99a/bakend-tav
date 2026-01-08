const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "..", "data", "donantes.json");

function readDonantes() {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeDonantes(donantes) {
  const ordenados = [...donantes].sort((a, b) => a.rut - b.rut);
  fs.writeFileSync(DATA_PATH, JSON.stringify(ordenados, null, 2));
}

function findByRut(rut) {
  return readDonantes().find(d => d.rut === Number(rut)) || null;
}

function addDonante(donante) {
  const donantes = readDonantes();
  if (donantes.some(d => d.rut === donante.rut)) {
    return false;
  }
  donantes.push(donante);
  writeDonantes(donantes);
  return true;
}

function deleteByRut(rut) {
  const donantes = readDonantes();
  const filtrados = donantes.filter(d => d.rut !== Number(rut));
  if (filtrados.length === donantes.length) return false;
  writeDonantes(filtrados);
  return true;
}

module.exports = { readDonantes, findByRut, addDonante, deleteByRut };