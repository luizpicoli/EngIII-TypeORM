import { Router } from 'express';
import ClientRepository from '../repositories/ClientRepository';
import CreateClientService from '../services/CreateClientService';

const clientRouter = Router();
const clientRepository = new ClientRepository();

clientRouter.get('/', (request, response) => {
  response.json(clientRepository.findAll());
});

clientRouter.post('/', (request, response) => {
  try {
    const service = new CreateClientService(clientRepository);
    const {
      name,
      cpf,
      email,
      money,
      code,
    } = request.body;
    const client = service.execute({
      name,
      cpf,
      email,
      money,
      code,
    });
    response.status(201).json(client);
  } catch (err) {
    return response.status(400).json({ Erro: err.message });
  }
});

clientRouter.delete('/delete/:code', (request, response) => {
  try {
    const code = parseInt(request.params.code, 10);
    return response.json(clientRepository.deleteByCode(code));
  } catch (err) {
    return response.status(400).json({ Erro: err.message });
  }
});

clientRouter.put('/att/:code', (request, response) => {
  try{
    const code = parseInt(request.params.code, 10);
    const name = request.body.name;
    const cpf = request.body.cpf;
    const email = request.body.email;
    const money = request.body.money;

    return response.json(clientRepository.att(name, cpf, email, money, code))

  } catch (err) {
    return response.status(400).json({ Erro: err.message });
  }
});

export default clientRouter;