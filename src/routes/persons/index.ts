import {FastifyInstance, FastifyPluginAsync} from 'fastify'
import {Person, PersonsRepository} from "./PersonsRepository.js";

type PostBody = {
  name: string,
  surname: string,
}

type PutBody = {
  name: string,
  surname: string,
}

type PutParams = {
  id: string,
}

type DeleteParams = {
  id: string,
}

const persons: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {
  const repository = new PersonsRepository()

  fastify.get('/', async function (): Promise<Person[]> {
    return repository.getAll()
  })

  fastify.post<{ Body: PostBody }>('/', async function (request): Promise<Person> {
    const { body } = request
    return repository.create(body.name, body.surname)
  })

  fastify.put<{ Body: PutBody }>('/:id', async function (request): Promise<Person> {
    const { body, params } = request
    return repository.update(parseInt((params as PutParams).id), body.name, body.surname)
  })

  fastify.delete('/:id', async function (request): Promise<void> {
    const { params } = request
    return repository.delete(parseInt((params as DeleteParams).id))
  })
}

export default persons
