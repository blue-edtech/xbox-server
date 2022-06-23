import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Recebe uma requisição GET e retorna um objeto de status
   * da aplicação com a URL de documentação
   * @param req Objeto de Request do Express
   * @returns Objeto de status da aplicação
   */

  @Get()
  @ApiOperation({
    summary: 'Display status of aplication',
  })
  getStatus() {
    return this.appService.getStatus('http://localhost:3000');
  }
}
