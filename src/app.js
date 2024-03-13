import express from "express";
import cors from "cors";
import morgan from "morgan";
import axios from "axios";
import TelegramBot from "node-telegram-bot-api";

import * as middleware from "./utils/middleware.js";

const app = express();
const botToken = '6769576713:AAFHPH_ObAOeNGC9kvYNWt8mG8-utwPs7KQ';
const bot = new TelegramBot(botToken);


app.use(express.json());


app.use(cors());


app.use(morgan("tiny"));


app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});


app.post("/order", (req, res) => {
  const { userName, userTelephone, deliveryCityName, deliveryDepart, userOrderProduct, productSizes, paymentOption, orderComment } = req.body;


  const message = `
    Новый заказ:
    Имя: ${userName}
    Телефон: ${userTelephone}
    Город: ${deliveryCityName}
    Отделение: ${deliveryDepart}
    Продукт: ${userOrderProduct}
    Размер: ${productSizes}
    Оплата: ${paymentOption}
    Комментарий: ${orderComment}
  `;

  bot.sendMessage('5406411100', message)
    .then(() => {
      console.log('Order notification sent to Telegram');
      res.status(200).send({ message: 'Order submitted successfully' });
    })
    .catch((error) => {
      console.error('Error sending order notification to Telegram:', error);
      res.status(500).send({ error: 'Failed to submit order' });
    });
});

// custom middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
