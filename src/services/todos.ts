import axios from "axios";
import generateRandomAnimal from "random-animal-name";
import { addDays } from "date-fns";

export const BASE_URL = "https://3t5qygoujf.execute-api.ap-southeast-2.amazonaws.com/production/";


const getAllTodo = () => {
  return axios.get(BASE_URL)
};


const createRandomTodo = (user: any) => {
  return axios.post(
    BASE_URL,
    {
      title: generateRandomAnimal(),
      description: 'desc ' + generateRandomAnimal(),
      published: Math.random() < 0.5,
      author: {
        name: user?.name,
        image: user?.image,
      }
    }, {
    headers: {
      "Content-Type": 'application/json'
    }
  }
  )
};

const createTodo = (payload: any, user: any) => {
  return axios.post(
    BASE_URL,
    {
      ...payload, author: {
        name: user?.name,
        image: user?.image,
      }
    },
    {
      headers: {
        "Content-Type": 'application/json'
      }
    }
  )
};

const deleteTodo = (id:string) => {
  return axios.delete(
    BASE_URL + id,
    {
      headers: {
        "Content-Type": 'application/json'
      }
    }
  )
};

const updateTodoStatus = (todo:any, user:any) => {
  return axios.put(
    BASE_URL + todo.id,
    {
      published: !todo.published,
      author: {
        name: user?.name,
        image: user?.image,
      }
    }, {
    headers: {
      "Content-Type": 'application/json',
    }
  }
  )
};

const updateTodo = (todo:any, user:any) => {
  return axios.put(
    BASE_URL + todo.id,
    {
      title: 'New ' + generateRandomAnimal(),
      description: 'New ' + generateRandomAnimal(),
      published: !todo.published,
      deadline: addDays(new Date(), 20),
      author: {
        name: user?.name,
        image: user?.image,
      }
    }, {
    headers: {
      "Content-Type": 'application/json',
    }
  }
  )
};

const updateTodoSerious = (payload:any, user:any) => {
  return axios.put(
    BASE_URL + payload.id,
    {...payload,author: {
      name: user?.name,
      image: user?.image,
    }},
    {
      headers: {
        "Content-Type": 'application/json',
      }
    }
  )
};

const TodoService = {
  getAllTodo,
  deleteTodo,
  createRandomTodo,
  createTodo,
  updateTodoStatus,
  updateTodo,
  updateTodoSerious,
};

export default TodoService;