import TodoService, { BASE_URL } from '../../src/services/todos';
import axios from 'axios';

jest.mock('axios')

const dummyUser = { 
  name: 'aa', 
  image: 'testimage' 
}

const dummyTodos = [
  {
    title: 'dummy title 1',
    description: 'desc 1',
    deadline: '2023-05-23T00:00:00.000Z',
    published: false,
    createdAt: '2023-05-03T06:12:45.293Z',
    updatedAt: '2023-05-03T06:12:45.293Z',
    id: '1'
  },
  {
    title: 'dummy title 2',
    description: 'desc 2',
    deadline: '2023-05-25T00:00:00.000Z',
    published: false,
    createdAt: '2023-05-03T06:12:45.293Z',
    updatedAt: '2023-05-03T06:12:45.293Z',
    id: '2'
  },
  {
    title: 'dummy title 3',
    description: 'desc 3',
    deadline: '2023-05-26T00:00:00.000Z',
    published: false,
    createdAt: '2023-05-03T06:12:45.293Z',
    updatedAt: '2023-05-03T06:12:45.293Z',
    id: '3'
  },
]

const postDummyPayload =
  [{
    title: 'dummy title 4',
    description: 'desc 4',
    deadline: '2023-05-29T00:00:00.000Z',
    published: false,
    createdAt: '2023-05-03T06:12:45.293Z',
    updatedAt: '2023-05-03T06:12:45.293Z',
    id: '4'
  }]

const updateDummyPayload =
  [{
    title: 'New title 3',
    description: 'New desc 3',
    deadline: '2023-05-29T00:00:00.000Z',
    published: false,
    createdAt: '2023-05-03T06:12:45.293Z',
    updatedAt: '2023-05-03T06:12:45.293Z',
    id: '3'
  }]

describe('Testing API Calls', () => {
  it('should be able to get all data', async () => {
    axios.get.mockResolvedValueOnce(dummyTodos);

    const result = await TodoService.getAllTodo();

    expect(axios.get).toHaveBeenCalledWith(BASE_URL);
    expect(result).toEqual(dummyTodos);
  });

  it('should be able to post', async () => {
    axios.post.mockResolvedValueOnce(postDummyPayload);

    const result = await TodoService.createRandomTodo(dummyUser);
    
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(result).toEqual(postDummyPayload);
  });

  it('should be able to edit a todo', async () => {
    axios.put.mockResolvedValueOnce(updateDummyPayload);

    const result = await TodoService.updateTodo(updateDummyPayload,dummyUser);
    
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(result).toEqual(updateDummyPayload);
  });

  it('should be able to delete a todo', async () => {
    axios.delete.mockResolvedValueOnce({
      message: "Tutorial was deleted successfully!"
  });

    const result = await TodoService.deleteTodo('4');
    
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('message', 'Tutorial was deleted successfully!');
  });
});