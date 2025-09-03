import { chatBotService } from '@app/chat_bot_service/chat_bot.service';
import { IChatBotService } from '@app/chat_bot_service/types/interfaceClass';
import { Provider } from '@nestjs/common';
import CreateTransaction from '@use-cases/Transactions/create-Transaction';
import { GetTransactionById } from '@use-cases/Transactions/get-Transaction-by-id';
import GetTransactions from '@use-cases/Transactions/get-Transactions';
import { SoftDeleteTransaction } from '@use-cases/Transactions/softdelete-Transaction';
import { UpdateTransaction } from '@use-cases/Transactions/update-Transaction';
import CreateUser from '@use-cases/users/create-user';
import { GetUserById } from '@use-cases/users/get-user-by-id';
import GetUserByUserName from '@use-cases/users/get-user-by-username';
import GetUsers from '@use-cases/users/get-users';
import { SoftDeleteUser } from '@use-cases/users/softdelete-user';
import { UpdateUser } from '@use-cases/users/update-user';

export const useCasesProvider: Provider[] = [
  CreateUser,
  UpdateUser,
  GetUsers,
  GetUserById,
  SoftDeleteUser,
  GetUserByUserName,
  CreateTransaction,
  GetTransactions,
  GetTransactionById,
  SoftDeleteTransaction,
  UpdateTransaction,
  {
    provide: 'IChatBotService',
    useClass: chatBotService,
  },
];
