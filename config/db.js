const express= require('express')
const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'iswanto',
  password: 'password',
  database: 'migratation',
  port: 5432,
});

const connect = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to database');
    return client;
  } catch (err) {
    console.error('Error connecting to database', err);
  }
}

module.exports = {pool, connect};