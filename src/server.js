const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const JWT_SECRET =
  process.env.JWT_SECRET || "CHANGE_THIS_SANDBOX_SECRET";

const DB_FILE = path.join(__dirname, "..", "data.json");

const seed = {
  users: [],
  units: [
    {
      id: "popcorn",
      name: "Popcorn Business Unit",
      icon: "🍿",
      minContribution: 5000,
      periodDays: 15,
      status: "OPEN"
    },
    {
      id: "juice",
      name: "Juice Business Unit",
      icon: "🥤",
      minContribution: 10000,
      periodDays: 10,
      status: "OPEN"
    },
    {
      id: "carwash",
      name: "Car Wash Unit",
      icon: "🚗",
      minContribution: 20000,
      periodDays: 15,
      status: "OPEN"
    },
    {
      id: "laundry",
      name: "Laundry Unit",
      icon: "🧺",
      minContribution: 50000,
      periodDays: 30,
      status: "OPEN"
    }
  ],
  activationPayments: [],
  contributions: [],
  withdrawals: [],
  distributions: [],
  ledger: [],
  auditLog: []
};

function loadDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify(seed, null, 2)
    );
    return JSON.parse(JSON.stringify(seed));
  }

  return JSON.parse(
    fs.readFileSync(DB_FILE, "utf8")
  );
}

let db = loadDb();

function saveDb() {
  fs.writeFileSync(
    DB_FILE,
    JSON.stringify(db, null, 2)
  );
}

function makeId(prefix) {
  return (
    prefix +
    "_" +
    Date.now() +
    "_" +
    Math.random().toString(36).slice(2, 8)
  );
}

function now() {
  return new Date().toISOString();
}

function publicUser(user) {
  return {
    id: user.id,
    phone: user.phone,
    name: user.name,
    role: user.role,
    kycStatus: user.kycStatus,
    activated: user.activated,
    createdAt: user.createdAt
  };
}

function createToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
  }
