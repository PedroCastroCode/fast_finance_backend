import axios, { AxiosResponse } from 'axios';
import { typePost } from './types/typePost';
import { TypeResponse } from './types/typeResponse';
import { AbacusChatBotResponse, TransactionInput } from '@domain/transactions/inputs/transaction-input';
import { IChatBotService } from './types/interfaceClass';

export class ChatBotService implements IChatBotService {
  public async axiosChatBot(message: string): Promise<AbacusChatBotResponse> {
    const body: typePost = {
      messages: [
        {
          is_user: true,
          text: message,
        },
      ],
      deploymentToken: process.env.CHATBOT_DEPLOYMENT_TOKEN,
      deploymentId: process.env.CHATBOT_DEPLOYMENT_ID,
    };

    const response: TypeResponse = await this.post(body);
    if(!response.success) {
      return {
        success: false,
        data: {
          type: null,
          value: null,
          category: null,
          date: null,
          description: null,
        },
      };
    }
    return {
      success: true,
      data:JSON.parse(response.result.messages.find((i) => i.is_user === false).text),
    };
  }

  private async post(body: typePost): Promise<TypeResponse> {
    try {
      const res = await axios.post(process.env.CHATBOT_URL, body, {
        headers: {
          apiKey: `${process.env.CHATBOT_APIKEY}`,
        },
      });
      console.log('Success in chatBotService:', res.data);
      return res.data as TypeResponse;
    } catch (err) {
      return {
        success: false,
        message: 'Error in Abacus chatBotService',
      } as TypeResponse;
    }
  }
}
