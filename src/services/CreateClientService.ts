import ClientRepository from '../repositories/ClientRepository';
import Client from '../models/Client';

export default class CreateClientService {
  private repository: ClientRepository;

  constructor(repository: ClientRepository) {
    this.repository = repository;
  }

  public execute({
    name,
    cpf,
    email,
    money,
    code,
  }: Client): Client {
    const client = this.repository.findByCode(code);
    if (client) {
      throw Error('Cliente já cadastrado');
    } else {
      const p = new Client({
        name,
        cpf,
        email,
        money,
        code,
      });
      this.repository.save(p);
      return p;
    }
  }
}