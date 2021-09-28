import { Router } from 'express';
import ProductRepository from '../repositories/ProductRepository';
import CreateProductService from '../services/CreateProductService';

const productRouter = Router();
const productRepository = new ProductRepository();

productRouter.get('/', (request, response) => {
  response.json(productRepository.findAll());
});

productRouter.post('/', (request, response) => {
  try {
    const service = new CreateProductService(productRepository);
    const {
      buyPrice,
      code,
      description,
      lovers,
      sellPrice,
      tags,
      id,
    } = request.body;
    const produto = service.execute({
      buyPrice,
      code,
      description,
      lovers,
      sellPrice,
      tags,
      id,
    });
    response.status(201).json(produto);
  } catch (err) {
    return response.status(400).json({ Erro: err.message });
  }
});

productRouter.delete('/delete/:code', (request, response) => {
  try {
    const code = parseInt(request.params.code, 10);
    return response.json(productRepository.deleteByCode(code));
  } catch (err) {
    return response.status(400).json({ Erro: err.message });
  }
});

productRouter.put('/att/:code', (request, response) => {
  try{
    const code = parseInt(request.params.code, 10);
    const description = request.body.description;
    const buyPrice = request.body.buyPrice;
    const sellPrice = request.body.sellPrice;
    const tags = request.body.tags;
    const id = request.body.id;

    return response.json(productRepository.att(id, code, description, buyPrice, sellPrice, tags))

  } catch (err) {
    return response.status(400).json({ Erro: err.message });
  }
});

export default productRouter;