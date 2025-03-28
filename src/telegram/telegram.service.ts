import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf(process.env.API_KEY_BOT ?? '');
  }

  onModuleInit() {
    this.initializeBot();
  }

  private initializeBot() {
    // Обработка текстовых сообщений
    this.bot.on(message('text'), (ctx) => {
      ctx.reply(`Вы написали: ${ctx.message.text}`);
    });

    // Обработка аудиофайлов
    this.bot.on(message('audio'), (ctx) => {
      ctx.reply('Вы отправили аудиофайл.');
      // Здесь можно добавить обработку аудиофайла, например, сохранить его или проанализировать
    });

    // Обработка голосовых сообщений
    this.bot.on(message('voice'), async (ctx) => {
      const voice = ctx.message.voice;
      if (voice) {
        const fileId = voice.file_id;

        // Получение файла
        const fileLink = await this.bot.telegram.getFileLink(fileId);
        ctx.reply(
          'Вы отправили голосовое сообщение. Вот ссылка на файл: ' + fileLink,
        );

        // Здесь можно добавить дополнительную обработку, например, сохранить файл или транскрибировать его
      }
    });

    // Запуск бота
    this.bot
      .launch()
      .then(() => {
        console.log('Телеграм бот запущен!');
      })
      .catch((err) => {
        console.error('Ошибка при запуске бота:', err);
      });
  }
}
