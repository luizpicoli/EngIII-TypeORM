import Client from '../models/Client'

export default class ClientRepository {
  clients: Array<Client>;

  constructor() {
    this.clients = [];
  }

  public findAll(): Array<Client> {
    return this.clients;
  }

  public findByCode(code: number): Client | undefined {
    return this.clients.find(v => v.code === code);
  }

  public save({
    name,
    cpf,
    email,
    money,
    code,
  }: Client): Client {
    const client = new Client({
      name,
      cpf,
      email,
      money,
      code,
    });
    this.clients.push(client);
    return client;
  }

  public deleteByCode(code: number) {
    const index = this.clients.findIndex(index => index.code === code);

    if (index === -1) {
      throw Error('Erro!');
    }

    this.clients.splice(index, 1);
    return this.clients;
  }

  public att(
    name: string,
    cpf: string,
    email: string,
    money: number,
    code: number,

  ): Client | undefined {
    const index = this.clients.find(p => p.code === code);

    if (index == undefined) {
      throw Error('Erro!');
    } else {

    index.name = name;
    index.cpf = cpf;
    index.email = email;
    index.money = money;
    index.code = code;
    }
    return index;
  }

}