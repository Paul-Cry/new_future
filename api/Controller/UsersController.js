'use strict'

const bcrypt = require('bcryptjs')
const response = require('../response.js')
const db = require('../settings/db')
const config = require('../config.js')
const buffer = require('buffer');
const { log } = require('console')
const filePath = buffer.toString();
const path = require('path')
const fs = require('fs')

//Регистрация
exports.signup = async function(req, res) {
    const { username, email, password } = req.body;
    const sqlCheckUser = `SELECT * FROM users WHERE username = '${username}' OR email = '${email}'`;
    db.query(sqlCheckUser, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
        res.status(409).json({ message: 'User already exists' });
        } else {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) throw err;

            const sqlInsertUser = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hash}')`;
            db.query(sqlInsertUser, (err, result) => {
            if (err) throw err;

            res.status(201).json({ message: 'User registered successfully' });
            });
        });
    }
  });
}

//Авторизация
exports.signin = (req, res) => {
    const { username, password } = req.body;
    const sqlSelectUser = `SELECT * FROM users WHERE username = '${username}'`;

    db.query(sqlSelectUser, (err, result) => {
      if (err) throw err;
  
      if (result.length === 0) {
        res.status(401).json({ message: 'Invalid username or password' });
      } else {
        bcrypt.compare(password, result[0].password, (err, match) => {
          if (err) throw err;
  
          if (match) {
            res.status(200).json({ message: 'User authenticated successfully' });
          } else {
            res.status(401).json({ message: 'Invalid username or password' });
          }
        });
      }
    });
}

//Создание карточки
exports.cards_create = (req, res) => {
    const { name, price } = req.body;
    const image = req.file.filename; // Имя файла будет автоматически создано multer
    const sqlInsertCard = `INSERT INTO cards (name, image, price) VALUES ('${name}', '${image}', '${price}')`;
  
    db.query(sqlInsertCard, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log('Card added to database');
      res.sendStatus(200);
    });
}

//Отправлять данные об карточках
exports.cards_get = (req, res) => {
    // Выполняем запрос к базе данных для получения всех изображений
    db.query('SELECT * FROM cards', (err, results) => {
    if (err) {
      // Обрабатываем ошибку запроса к базе данных
      console.error(err);
      res.status(500).send('Ошибка запроса к базе данных');
    } else {
      // Если запрос выполнен успешно, то отправляем все изображения пользователю
      const cards = results.map((result) =>{
        result.image = result.image.toString()
        return result
      });
      console.log(cards)
      res.send(cards);
    }
  });
}

//Редактировать карточку
exports.cards_edit = (req, res) => {
    const cardId = req.params.id;
    const { name, price } = req.body;
    const image = req.file.filename;
    // Проверяем, что все необходимые поля есть в запросе
    if (!name || !image || !price) {
      return res.status(400).send('Не все поля заполнены');
    }
  
    // Выполняем запрос к базе данных на обновление карточки
    db.query(
      `UPDATE cards SET name = '${name}', image = '${image}', price = '${price}' WHERE id = ${cardId}`, 
      (err, results) => {
        if (err) {
          // Обрабатываем ошибку запроса к базе данных
          console.error(err);
          res.status(500).send('Ошибка запроса к базе данных');
        } else {
          res.send('Карточка успешно обновлена');
        }
  });
  
}

//Удаление карточки 
exports.cards_del = (req, res) => {
  const cardId = req.params.id;
  db.query('SELECT * FROM cards WHERE id = ?', [cardId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка запроса к базе данных');
    } else if (results.length === 0) {
      res.status(404).send('Карточка не найдена');
    } else {
      // Удаляем карточку из базы данных
      db.query('DELETE FROM cards WHERE id = ?', [cardId], (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Ошибка запроса к базе данных');
        } else {
          // Удаляем связанные с карточкой изображения из папки img
          const images = results.map((result) => result.image.toString());
          images.forEach((image) => {
            const imagePath = path.resolve(__dirname, '..', 'img', image);
            const updatedPath = imagePath.replace(/\\/g, '/');
            fs.unlink(updatedPath, (err) => {
              if (err) {
                console.error(err);
              }
            });
          });
          res.status(200).send('Карточка успешно удалена');
        }
      });
    }
  });
}


