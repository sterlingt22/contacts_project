const express = require('express');
const router = express.Router();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId }).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Must use a valid contact id' });
  }
};


const createContact = async (req, res) => {
try {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Interal Server Error'});
}
};

const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};