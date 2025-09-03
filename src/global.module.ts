import { Global, Module } from '@nestjs/common';
import { repositoriesProvider } from './providers/repositories.provider';
import { useCasesProvider } from './providers/use-cases.provider';

@Global()
@Module({
  providers: [
    ...Object.values(useCasesProvider),
    ...Object.values(repositoriesProvider),
  ],
  exports: [
    ...Object.values(useCasesProvider),
    ...Object.values(repositoriesProvider),
  ],
})
export class GlobalModule {}
