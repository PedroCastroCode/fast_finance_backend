import { ChatBotService } from '@app/chat_bot_service/chat_bot.service';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class BotService implements OnModuleInit {
  private readonly logger = new Logger(BotService.name);
  private bot: any;
  constructor(private readonly chatBotService: ChatBotService) {}

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

    this.bot.on('message', (msg: any) => {
      this.logger.log(`Mensagem recebida: ${JSON.stringify({
        chatId: msg.chat?.id,
        from: msg.from?.username,
        text: msg.text,
      })}`);

      const text = (msg.text || '').toLowerCase().trim();
      if(text) {
       this.chatBotService.axiosChatBot(text).then((res) => {
        this.logger.verbose(res)
        var messageToUser = `Registrado ${res.type} no dia ${res.date} na categoria ${res.category} no valor de ${res.value}` 
        this.bot.sendMessage(
            msg.chat.id,
            messageToUser
        )
       }).catch((err) => {
        this.logger.error(`Falha ao enviar mensagem: ${err?.message ?? JSON.stringify(err)}`);
       })
      } else  {
        this.logger.error(`text vazio = ${text}`)
      }
     
    });

    this.logger.log('Telegram bot iniciado com polling: true.');
  }
}