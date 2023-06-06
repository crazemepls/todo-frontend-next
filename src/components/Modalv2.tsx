import { format } from "date-fns"
import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { uploadImage } from "@/services/uploadImage"

function Modalv2({ handleCloseModal, handleNewTodo, defaultTodo }: any) {
  const [isNewImageSelected, setIsNewImageSelected] = useState('DEFAULT')
  let currentTodo = {
    title: '',
    description: '',
    deadline: '',
    published: '',
    id: '',
    image: '',
  }

  const todayDate = format(new Date(), 'yyyy-MM-dd')
  const isEdit = defaultTodo?.id

  if (isEdit) {
    currentTodo = {
      title: defaultTodo.title,
      description: defaultTodo.description,
      deadline: format(new Date(defaultTodo.deadline), 'yyyy-MM-dd'),
      published: defaultTodo.published,
      id: defaultTodo.id,
      image: '',
    }
  }

  const onSubmit = async (values: any) => {
    let newImageUrl
    //1st case : empty -> filled (should update)                
    //2nd case : filled -> filled (should update to newest)     
    //3rd case : filled -> empty (should not change the data)   

    if (!defaultTodo?.image && values.image) { //1st case
      newImageUrl = await uploadImage(values.image)
    }
    else if (defaultTodo?.image && values.image) { //2nd case
      newImageUrl = await uploadImage(values.image)
    }
    else { //3rd case
      newImageUrl = defaultTodo?.image
    }

    values.image = newImageUrl
    await handleNewTodo(values)
  }

  const required = (value: any) => (value ? undefined : 'Required')
  const maxChar = (max: number) => (value: any) => (value.length <= max ? undefined : 'Too much text!')

  const composeValidators = (...validators: any) => (value: any) =>
    validators.reduce((error: any, validator: any) => error || validator(value), undefined)

  const imagechange = ([name]: any, state: any, { changeValue }: any) => {
    changeValue(state, name, () => 'bla')
  }

  return (
    <>
      <div
        className="py-12 bg-gray-700 bg-opacity-80  transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 text-black">
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">{isEdit ? 'Edit Todo' : 'Add New Todo'}</h1>
            <Form
              id="new_document_attachment"
              mutators={{ imagechange }}
              onSubmit={onSubmit}
              initialValues={currentTodo}
              render={({ handleSubmit, submitting, values, form }) => (
                <form onSubmit={handleSubmit}
                >
                  <div>
                    <Field name="title" validate={composeValidators(required, maxChar(10))}>
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

                    <label htmlFor="image" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Image</label>
                    <p />
                    {
                      isNewImageSelected === 'DEFAULT' ?
                        defaultTodo?.image && <div style={{ width: '25%', alignItems: 'center', justifyContent: 'center', display: 'flex', paddingRight: '10px' }}>
                          <img className="w-40 h-20 mx-2 object-contain" src={defaultTodo?.image} alt="image" />
                        </div>
                        :
                        'New image is selected!'
                    }

                    <Field<FileList> name='image'>
                      {({ input: { value, onChange, ...input } }) => (
                        <input
                          id="document_attachment_doc"
                          {...input}
                          type="file"
                          accept="image/*"
                          onChange={({ target }) => {
                            onChange(target.files);
                            target.files?.length ? setIsNewImageSelected('FILLED') : setIsNewImageSelected('DEFAULT')
                          }} // instead of the default target.value
                          className="text-gray-400 focus:outline-none focus:border font-normal w-full h-10 flex items-center text-sm pt-2 mb-4"
                        />
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
                  </div>
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