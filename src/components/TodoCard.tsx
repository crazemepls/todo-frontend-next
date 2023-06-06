import { formatDistanceToNow, isPast } from 'date-fns'
import React, { useState } from 'react'
import ImageModal from './ImageModal'


function TodoCard({ todo, handleDeleteTodo, handleUpdateTodoStatus, handleUpdateTodo, handleOpenEditModal }: any) {
  const [openImageModal, setOpenImageModal] = useState(false)
  const deadline = todo?.deadline ? formatDistanceToNow(new Date(todo.deadline), { includeSeconds: true, addSuffix: true }) : "No deadline"
  const isDone = todo?.published
  const isDeadlinePast = isPast(new Date(todo.deadline))
  const [hideDiv, setHideDiv] = useState(false)
  const [showDiv, setShowDiv] = useState(false)

  const handleCloseEditModal = () => {
    setOpenImageModal(false)
  }

  const handleHideDiv = () => {
    setHideDiv(true)
  }

  const handleShowDiv = () => {
    setShowDiv(true)
  }

  const handleFadeInFadeOut = () =>{
      if(hideDiv){
        return 'hiddenTodoCard'
      }
      else if (showDiv){
        return 'visibleTodoCard'
      }
      else{
        return ''
      }
  }

  return (
    <div style={{ padding: '10px', margin: '5px', background: '#ffffdd', display: 'flex', flexDirection: 'row' }}
      className={handleFadeInFadeOut()}
      key={todo.id}
    >
      <div style={{ width: '5%', alignItems: 'center', justifyContent: 'center', display: 'flex', paddingRight: '10px' }}>
        <input
          type={'checkbox'}
          defaultChecked={todo.published}
          onChange={() => handleUpdateTodoStatus(todo)}
        />
      </div>
      {
        todo?.image &&
        <div style={{ width: '20%', alignItems: 'center', justifyContent: 'center', display: 'flex', paddingRight: '10px' }}>
          <img className="w-40 h-20 mx-2 object-contain cursor-pointer" src={todo?.image} alt="image" onClick={() => setOpenImageModal(true)} />
        </div>
      }

      <div style={{ width: '70%' }}>
        <p style={{ fontWeight: 'bold', color: 'black', fontSize: "20px", textDecoration: isDone ? 'line-through' : '' }}>{todo?.title}</p>
        <p />
        <p style={{ color: 'black', fontSize: "15px", textOverflow: 'ellipsis', textDecoration: isDone ? 'line-through' : '' }}>{todo?.description}</p>
        <p />
        <p style={{ color: isDeadlinePast ? 'red' : 'black', fontSize: "12px", textOverflow: 'ellipsis', textDecoration: isDone ? 'line-through' : '' }}>{"Deadline : " + deadline}</p>

        {
          todo?.author?.image && <>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '6px' }}>
              <p style={{ color: 'black', fontSize: "13px", textOverflow: 'ellipsis' }}>{"Last update: " + todo?.author?.name}</p>
              <img className="w-4 h-4 mx-2 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={todo?.author?.image} alt="Bordered avatar" />
            </div>
          </>
        }      
      </div>

      <div style={{ width: '25%', alignItems: 'center', justifyContent: 'center', display: 'flex', paddingRight: '20px', flexDirection: 'column' }}>
        <button style={{ display: 'flex', fontSize: '14px', margin: "0px 5px", color: '#32a840', minWidth: '84px' }} onClick={() => handleUpdateTodo(todo)}>Random Edit</button>
        <button style={{ display: 'flex', fontSize: '14px', margin: "0px 5px", color: '#32a840' }} onClick={() => handleOpenEditModal(todo.id)}>Edit</button>
        <button style={{ display: 'flex', fontSize: '14px', margin: "0px 5px", color: '#d12121' }}
          onClick={() => {
            handleDeleteTodo(todo.id)
              .then(handleHideDiv())
          }}>
          Delete
        </button>
      </div>
      {todo?.image && openImageModal && <ImageModal handleCloseModal={handleCloseEditModal} todo={todo} />}
    </div>
  )
}

export default TodoCard