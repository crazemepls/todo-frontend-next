import { format, addDays, isPast, isToday, isValid, isFuture } from "date-fns"
import React, { useReducer, useState } from 'react'
import { Form, Field } from 'react-final-form'

function Modalv2({ handleCloseModal, handleNewTodo, defaultTodo }: any) {
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
      deadline: format(new Date(defaultTodo.deadline), 'yyyy-MM-dd'),
      published: defaultTodo.published,
      id: defaultTodo.id
    }
  }

  const onSubmit = async (values: any) => {
    await handleNewTodo(values)
  }

  const required = (value: any) => (value ? undefined : 'Required')

  return (
    <>
      <div className="py-12 bg-gray-700 bg-opacity-80  transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 text-black">
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">{isEdit ? 'Edit Todo' : 'Add New Todo'}</h1>
            <Form
              onSubmit={onSubmit}
              initialValues={currentTodo}
              render={({ handleSubmit, submitting, pristine }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="title" validate={required}>
                    {({ input, meta, }) => (
                      <div>
                        <label htmlFor="title" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Title</label>
                        {meta.error && meta.touched && <span className="float-right text-red-600 text-sm">{meta.error}</span>}
                        <input
                          {...input}
                          type="text"
                          id="title"
                          name="title"
                          className="mb-5 mt-2 text-gray-200 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                          placeholder="Adjust Padding"
                        />
                      </div>
                    )}
                  </Field>
                  <Field name="description" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <label htmlFor="description" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Description</label>
                        {meta.error && meta.touched && <span className="float-right text-red-600 text-sm">{meta.error}</span>}
                        <input
                          {...input}
                          id="description"
                          className=" mb-5 mt-2 text-gray-200 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                          name="description"
                          placeholder="desc blabla"
                        />
                      </div>
                    )}
                  </Field>
                  <Field name="deadline" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <label htmlFor="deadline" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Deadline</label>
                        {meta.error && meta.touched && <span className="float-right text-red-600 text-sm">{meta.error}</span>}
                        <div className="relative mb-5 mt-2">
                          <input
                            {...input}
                            id="expiry"
                            name="deadline"
                            min={todayDate}
                            type='date'
                            className="text-gray-400 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                        </div>
                      </div>
                    )}
                  </Field>
                  <Field name="published" type="checkbox">
                    {({ input }) => (
                      <div>
                        <label
                          htmlFor="cvc"
                          className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                          Done?
                        </label>
                        <input
                          {...input}
                          type='checkbox'
                          name="published"
                          className="mb-8 mt-2 focus:outline-none focus:border focus:border-indigo-700 font-normal flex  pl-3 border-gray-300 rounded border"
                        />
                      </div>
                    )}
                  </Field>
                  <div className="flex items-center justify-start w-full">

                    {
                      isEdit ? (
                        <button
                          type="submit"
                          disabled={submitting}
                          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                        >
                          {submitting ? 'Updating...' : 'Save'}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={submitting}
                          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                        >
                          {submitting ? 'Creating...' : 'Create'}
                        </button>
                      )
                    }
                    <button
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                      onClick={() => { handleCloseModal() }}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            >
            </Form>
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

export default Modalv2