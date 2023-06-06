import { format, addDays, isPast, isToday, isValid, isFuture } from "date-fns"
import React, { useReducer, useState } from 'react'

const generateValue = (isCheckbox: boolean, isDate: boolean, event: any) => {
  if (isCheckbox) {
    return event.target.checked
  }
  else if (isDate) {
    return new Date(event.target.value)
  }
  return event.target.value
}

const formReducer = (state: any, event: any) => {
  const isCheckbox = event.target.type === 'checkbox';
  const isDate = event.target.type === 'date'
  return {
    ...state,
    [event.target.name]: generateValue(isCheckbox, isDate, event)
  }
}

function Modal({ handleCloseModal, handleNewTodo, defaultTodo }: any) {
  let currentTodo = {
    title: '',
    description: '',
    deadline: '',
    published: '',
    id: ''
  }

  const todayDate = format(new Date(), 'yyyy-MM-dd')
  const isEdit = defaultTodo?.id

  if (isEdit) {
    currentTodo = {
      title: defaultTodo.title,
      description: defaultTodo.description,
      deadline: defaultTodo.deadline,
      published: defaultTodo.published,
      id: defaultTodo.id
    }
  }
  const [formData, setFormData] = useReducer(formReducer, currentTodo);

  return (
    <>
      <div className="py-12 bg-gray-700 bg-opacity-80  transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 text-black">
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">{isEdit ? 'Edit Todo' : 'Add New Todo'}</h1>

            <label htmlFor="title" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Title</label>
            <input
              id="title"
              name="title"
              className="mb-5 mt-2 text-gray-200 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Adjust Padding"
              defaultValue={isEdit ? currentTodo.title : ''}
              onChange={setFormData}
            />

            <label htmlFor="description" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Description</label>
            <input
              id="description"
              className=" mb-5 mt-2 text-gray-200 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              name="description"
              placeholder="desc blabla"
              defaultValue={isEdit ? currentTodo.description : ''}
              onChange={setFormData}
            />

            <label htmlFor="deadline" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Deadline</label>
            <div className="relative mb-5 mt-2">
              <input
                id="expiry"
                name="deadline"
                min={todayDate}
                type='date'
                onChange={setFormData}
                defaultValue={isEdit ? format(new Date(currentTodo.deadline), 'yyyy-MM-dd') : ''}
                className="text-gray-400 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
            </div>

            <label
              htmlFor="cvc"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Done?
            </label>
            <input
              type='checkbox'
              name="published"
              onChange={setFormData}
              defaultValue={isEdit ? currentTodo.published : ''}
              className="mb-8 mt-2 focus:outline-none focus:border focus:border-indigo-700 font-normal flex  pl-3 border-gray-300 rounded border"
            />


            <div className="flex items-center justify-start w-full">
              {
                isEdit ? (
                  <button
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                    onClick={() => { handleNewTodo(formData) }}
                    // disabled={isFormValid(formData)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                    onClick={() => { handleNewTodo(formData) }}
                    // disabled={!formData.title || !formData.description}
                  >
                    Create
                  </button>
                )
              }
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                onClick={() => { handleCloseModal() }}>
                Cancel
              </button>
            </div>
            <button
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              onClick={() => { handleCloseModal() }}
              aria-label="close modal"
              role="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal