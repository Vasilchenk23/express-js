import { Router } from "express";
import axios from 'axios';

const routes = Router();

routes.post("/hello", async (req, res) => {
  try {
    const orderData = req.body;
    const telegramBotToken = '6769576713:AAFHPH_ObAOeNGC9kvYNWt8mG8-utwPs7KQ';
    const chatId = '1936815365';

    const message = `
      Новый заказ!
      Имя: ${orderData.userName}
      Телефон: ${orderData.userTelephone}
      Город: ${orderData.deliveryCityName}
      Отделение: ${orderData.deliveryDepart}
      Имя Товара ${orderData.userOrderProduct}
      Размеры ${orderData.productSizes}
      Оплата: ${orderData.paymentOption}
      Комментарий: ${orderData.orderComment}
    `;

    await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });

    res.status(200).send('Order submitted successfully');
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default routes;
