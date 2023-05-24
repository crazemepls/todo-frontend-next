import Head from 'next/head'
import axios from 'axios'
import styles from '@/styles/Home.module.css'
import TodoCard from '../components/TodoCard'
import generateRandomAnimal from 'random-animal-name'
import { useRouter } from 'next/router'
import { addDays } from 'date-fns'
import React, { useState, useEffect, useRef } from 'react'
import Modalv2 from '@/components/Modalv2'
import Pagination from '@/components/Pagination'
import useUserLoginInfo from '@/helper/useSession'
import ViewOnlyTodoCard from '@/components/ViewOnlyTodoCard'
import autoAnimate from '@formkit/auto-animate'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import TodoService from '../services/todos'

//fetch with "getServerSideProps"
export async function getServerSideProps() {
  //http request
  const req = await TodoService.getAllTodo()
  const res = await req.data

  return {
    props: {
      todos: res, // <-- assign response
    },
  }
}


function Home(props: any) {
  const router = useRouter()
  const { user, isLogin } = useUserLoginInfo();
  console.log(user)
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [todoFilter, setTodoFilter] = useState({ done: false, inProgress: true })
  const [buttonColor, setButtonColor] = React.useState('');
  const [filteredTodos, setFilteredTodos] = useState([{}])
  const [selectedTodo, setSelectedTodo] = useState({})
  const [sortDeadlineTightest, setSortDeadlineTightest] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // const [show, setShow] = useState(false)?
  // const [animationParent]  = useAutoAnimate()
  const aa = useRef(null)

  // if(!isLogin){
  //   return {
  //     redirect : {
  //       destination : '/',
  //       permanent: false,
  //     }
  //   }
  // }

  //destruct
  const { todos } = props;
  console.log(todos)

  const generateTodos = (todos: any) => {
    let sortedTodos

    if (sortDeadlineTightest) {
      sortedTodos = todos?.sort(
        (objA: any, objB: any) => Number(new Date(objA?.deadline)) - Number(new Date(objB?.deadline)),
      );
    }
    else {
      sortedTodos = todos?.sort(
        (objA: any, objB: any) => Number(new Date(objB?.deadline)) - Number(new Date(objA?.deadline)),
      );
    }

    if (todoFilter.done === todoFilter.inProgress) {
      return sortedTodos
    }
    else if (todoFilter.done) {
      return sortedTodos?.filter((todo: any) => todo.published === true)
    }
    else if (!todoFilter.done) {
      return sortedTodos?.filter((todo: any) => todo.published === false)
    }
  }

  const defaultPayload = {
    published: '',
  }

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleOpenEditModal = (id: string) => {
    setOpenEditModal(true)
    const blabla = filteredTodos.filter((todo: any) => todo.id === id)
    setSelectedTodo(blabla[0])
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleNewRandomTodo() {
    await TodoService.createRandomTodo(user)
      .then(
        refreshData
      )
  }

  async function handleNewTodo(payload: any) {
    await TodoService.createTodo(payload, user)
      .then(
        refreshData
      )
    setOpenModal(false)
  }

  async function handleDeleteTodo(id: string) {
    await TodoService.deleteTodo(id)
      .then(
        refreshData
      )
  }

  async function handleUpdateTodoStatus(todo: any) {
    await TodoService.updateTodoStatus(todo, user)
      .then(
        refreshData
      )
  }

  async function handleUpdateTodo(todo: any) {
    await TodoService.updateTodo(todo, user)
      .then(
        refreshData
      )
  }

  async function handleSeriousUpdateTodo(payload: any) {
    await TodoService.updateTodoSerious(payload, user)
      .then(
        refreshData
      )
    setOpenEditModal(false)
  }

  const handleChangeFilter = (category: string) => {
    if (category === 'done') {
      setTodoFilter({ ...todoFilter, done: !todoFilter.done })
    }
    else { //category===inProgress
      setTodoFilter({ ...todoFilter, inProgress: !todoFilter.inProgress })
    }
  }

  const handleSortDeadline = () => {
    setSortDeadlineTightest(!sortDeadlineTightest)
  }

  const generateRGBColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let val = `rgb(${r}, ${g}, ${b})`;
    return val
  }

  const paginate = (items: any, pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items?.slice(startIndex, startIndex + pageSize);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    refreshData
    setFilteredTodos(generateTodos(todos))
  }, [todoFilter, todos, sortDeadlineTightest])

  // useEffect(()=>{
  //   autoAnimate(aa)
  // })

  return (
    <>
      <Head>
        <title>Home - Axios Get</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {
          isLogin && (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <button
                className='mx-5 px-2 bg-gray-500'
                onClick={() => handleNewRandomTodo()}>
                New Random Todo
              </button>
              <button
                className='mx-5 px-2 bg-gray-500'
                onClick={() => handleOpenModal()}>
                New Todo
              </button>
            </div>)
        }

        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px' }}>
          Sort deadline :
          <button
            className='mx-5 px-2 bg-gray-500'
            onClick={() => handleSortDeadline()}>
            {sortDeadlineTightest ? 'Tightest to Loosest' : 'Loosest to Tightest'}
          </button>

        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <input onChange={() => handleChangeFilter('inProgress')} type='checkbox' className='mx-1  ml-8 px-2 bg-gray-500' defaultChecked={todoFilter.inProgress} />
          In Progress
          <input onChange={() => handleChangeFilter('done')} type='checkbox' className='mx-1 ml-8 px-2 bg-gray-500' defaultChecked={todoFilter.done} />
          Done
        </div>

        <div style={{ paddingTop: '20px' }}>
          {
            paginate(filteredTodos, currentPage, pageSize)?.map((todo: any) => (
              isLogin ? (
                // <div ref={parent}>
                <TodoCard
                  ref={aa}
                  todo={todo}
                  key={todo.id}
                  handleDeleteTodo={handleDeleteTodo}
                  handleUpdateTodoStatus={handleUpdateTodoStatus}
                  handleUpdateTodo={handleUpdateTodo}
                  handleOpenEditModal={handleOpenEditModal}
                />
                // </div>

              ) : (
                <ViewOnlyTodoCard
                  todo={todo}
                  key={todo.id}
                />
              )
            ))
          }
          <Pagination items={filteredTodos?.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
        </div>
        {openModal && <Modalv2 handleCloseModal={handleCloseModal} handleNewTodo={handleNewTodo} />}
        {openEditModal && <Modalv2 handleCloseModal={handleCloseEditModal} handleNewTodo={handleSeriousUpdateTodo} defaultTodo={selectedTodo} />}
      </main>
    </>
  )
}

export default Home