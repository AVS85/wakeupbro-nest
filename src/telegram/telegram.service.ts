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
    this.bot.on(message('text'), async (ctx) => {
      // Здесь можно добавить обработку текстовых сообщений, например, отправить ответный текст
      console.log(`Получено сообщение от пользователя ${ctx.from.first_name}`);

      await ctx.reply(`Вы написали: ${ctx.message.text}`);
      return;
    });

    // Обработка аудиофайлов
    this.bot.on(message('audio'), async (ctx) => {
      await ctx.reply('Вы отправили аудиофайл.');
      // Здесь можно добавить обработку аудиофайла, например, сохранить его или проанализировать
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
