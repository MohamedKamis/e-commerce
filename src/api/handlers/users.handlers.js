import { Request, Response } from 'express';
import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/users.models';
import { User } from '../types/types';

const userslog = new UserModel();

const index_user = async (req, res) => {
  try {
    const users = await userslog.index();
    res.send(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show_user = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const User = await userslog.show(id);
    res.send(User);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create_user = async (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    if (!firstname || !lastname || !password) {
      return res
        .status(400)
        .send('Please enter valid data( firstName, lastName, password)');
    }
    const TU = { firstname, lastname, password };
    const newuser = await userslog.create(TU);
    res.send(newuser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const authenticate = async function (req, res) {
  try {
    const user = {
      firstname: req.body.firstname,
      password: req.body.password,
      lastname: '',
    };

    const { TOKEN_SECRET } = process.env;
    const chack = await userslog.authenticate(user.firstname, user.password);
    if (chack == null) {
      return res.status(500).send('error');
    }
    const tokin = jwt.sign({ user_id: chack.id }, TOKEN_SECRET );
    return res.send(tokin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const verifyAuthToken = (req, res) => {
  const { TOKEN_SECRET } = process.env;
  try {
    const authorizationHeader = req.headers.authorization ;
    const token = authorizationHeader.split(' ')[1];
    const check = jwt.verify(token, TOKEN_SECRET );
    if (!check) {
      throw new Error('you have an error');
    }
    next();
  } catch (error) {
    res
      .status(401)
      .json(
        'Access denied, invalid token ,Pleas go to (http://localhost:2000/user/log)'
      );
  }
};

const view_userOrder = async (req, res) => {
  try {
    const userId = Number(req.params.user_id);
    const userOrders = await userslog.view_userOrder(userId);
    res.json(userOrders);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  index_user,
  show_user,
  create_user,
  view_userOrder,
  authenticate,
  verifyAuthToken,
};
