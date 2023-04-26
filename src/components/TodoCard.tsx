import { formatDistanceToNow, isPast } from 'date-fns'

function TodoCard({ todo, handleDeleteTodo, handleUpdateTodoStatus, handleUpdateTodo,handleOpenEditModal }: any) {
  const deadline = todo?.deadline ? formatDistanceToNow(new Date(todo.deadline), {includeSeconds:true, addSuffix:true}) : "No deadline"
  const isDone = todo?.published
  const isDeadlinePast = isPast(new Date(todo.deadline))

  return (
    <div style={{ padding: '10px', margin: '5px', background: '#ffffdd', display: 'flex', flexDirection: 'row' }}
      key={todo.id}
    >
      <div style={{ width: '5%', alignItems: 'center', justifyContent: 'center', display: 'flex', paddingRight: '10px' }}>
        <input
          type={'checkbox'}
          defaultChecked={todo.published}
          onChange={() => handleUpdateTodoStatus(todo)}
        />
      </div>

      <div style={{ width: '70%' }}>
        <p style={{ fontWeight: 'bold', color: 'black', fontSize: "20px", textDecoration: isDone ? 'line-through' : '' }}>{todo?.title}</p>
        <p />
        <p style={{ color: 'black', fontSize: "15px", textOverflow: 'ellipsis', textDecoration: isDone ? 'line-through' : '' }}>{todo?.description}</p>
        <p />
        <p style={{ color: isDeadlinePast? 'red':'black', fontSize: "12px", textOverflow: 'ellipsis', textDecoration: isDone ? 'line-through' : '' }}>{"Deadline : " + deadline}</p>
      </div>
      <div style={{ width: '25%', alignItems: 'center', justifyContent: 'center', display: 'flex', paddingRight: '20px', flexDirection: 'column' }}>
        <button style={{ display: 'flex',fontSize:'14px', margin: "0px 5px", color: '#32a840', minWidth:'84px' }} onClick={() => handleUpdateTodo(todo)}>Random Edit</button>
        <button style={{ display: 'flex',fontSize:'14px', margin: "0px 5px", color: '#32a840' }} onClick={() => handleOpenEditModal(todo.id)}>Edit</button>
        <button style={{ display: 'flex',fontSize:'14px', margin: "0px 5px", color: '#d12121' }} onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
      </div>
    </div>
  )
}

export default TodoCard