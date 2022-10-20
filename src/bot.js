require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { nimParser } = require("./nimParser");

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_to_message_id: msg.message_id,
  };

  try {
    if (msg.text === "/start") {
      bot.sendMessage(
        chatId,
        `Halo @${msg.from.username}, selamat datang di @cekNimUnsriBot. Bot ini dapat menampilkan informasi dari Nomor Induk Mahasiswa (NIM) pada Universitas Sriwijaya, Silahkan kirimkan nim untuk melihat informasi dari nim tersebut.`,
        opts
      );
    } else if (msg.text === "/help") {
      bot.sendMessage(
        chatId,
        `Silahkan kirimkan NIM dengan format berupa angka berjumlah 14 digit untuk melihat informasi dari NIM tersebut.

Contoh:
09021181823999
        `,
        opts
      );
    } else if (msg.text.length === 14 && msg.text.match(/^[0-9]+$/)) {
      const data = nimParser(msg.text);

      bot.sendMessage(chatId, data, opts);
    } else {
      bot.sendMessage(
        chatId,
        `Maaf NIM yang anda kirimkan tidak valid. kirim perintah /help untuk melihat informasi lebih lanjut`,
        opts
      );
    }
  } catch (error) {
    console.log(error);
    bot.sendMessage(
      chatId,
      `Error: ${error.message}, silahkan coba lagi`,
      opts
    );
  }
});
