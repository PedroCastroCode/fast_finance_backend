import { ChatBotService } from '@app/chat_bot_service/chat_bot.service';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import CreateTransaction from '@use-cases/Transactions/create-Transaction';

@Injectable()
export class BotService implements OnModuleInit {
  private readonly logger = new Logger(BotService.name);
  private bot: any;
  constructor(
    private readonly chatBotService: ChatBotService,
    private readonly createTransaction: CreateTransaction,
  ) {}

  onModuleInit() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      this.logger.error('TELEGRAM_BOT_TOKEN não definido');
      return;
    }

    const TelegramBot = require('node-telegram-bot-api');
    this.bot = new TelegramBot(token, { polling: true });

    this.bot.on('polling_error', (err: any) => {
      this.logger.error(`polling_error: ${JSON.stringify(err)}`);
    });

    this.bot.on('message', async (msg: any) => {
      this.logger.log(
        `Mensagem recebida: ${JSON.stringify({
          chatId: msg.chat?.id,
          from: msg.from?.id,
          text: msg.text,
        })}`,
      );

      const text = (msg.text || '').toLowerCase().trim(); //salgado 7
      if (text) {
        const res = await this.chatBotService.axiosChatBot(text);
        if (!res.success) {
          this.bot.sendMessage(
            msg.chat.id,
            'Não foi possível registrar a transação. Verifique os dados e tente novamente.',
          );
          return;
        }

        await this.createTransaction
          .Execute(res.data)
          .then(() => {
            var messageToUser = `Registrado ${res.data.type} no dia ${res.data.date} na categoria ${res.data.category} no valor de ${res.data.value}`;
            this.bot.sendMessage(msg.chat.id, messageToUser);
          })
          .catch((err) => {
            this.logger.error(`Erro ao criar no banco: ${err.message}`);
            this.bot.sendMessage(
              msg.chat.id,
              'Não foi possível registrar a transação. Verifique os dados e tente novamente.',
            );
          });
      } else {
        this.logger.error(`text vazio = ${text}`);
      }
    });
    this.logger.log('Telegram bot iniciado com polling: true.');
  }
}
