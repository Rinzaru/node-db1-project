const express = require("express");
const router = express.Router();

const db = require("../../data/dbConfig");

router.get("/", async (req, res, next) => {
  try {
    // SELECT * FROM accounts (sqlite command)
    const accounts = await db.select("*").from("accounts");
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  /*SELECT * FROM accounts 
    WHERE id = <value>
    LIMIT 1*/
  try {
    const [accounts] = await db
      .select("*")
      .from("accounts")
      .where("id", req.params.id)
      .limit(1);

    res.json(accounts);
  } catch {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  /*
    INSERT INTO accounts ("name", "budget")
    VALUES (<value>, <value>)
    */
  try {
    const [id] = await db
      .insert({
        //database auto generates ID
        name: req.body.name,
        budget: req.body.budget,
      })
      .into("accounts");

    const account = await db("accounts").where("id", id).first();

    res.status(201).json(account);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  /*
        UPDATE accounts
        SET name = <value>
        AND budget = <value>
        WHERE id = <value>
    */
  try {
    const accounts = await db("accounts")
      .update({
        name: req.body.name,
        budget: req.body.budget,
      })
      .where("id", req.params.id);

    res.json(accounts);
    //use req.params.id to make another SELECT statement
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  /*
        DELETE FROM accounts
        WHERE id = <value>
    */
  try {
    const accounts = await db("accounts").where("id", req.params.id).del();

    res.status(204).json({ message: "Account Deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
