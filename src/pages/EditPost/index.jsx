import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from '../../components/header'
import useData from '../../hooks/useData'
import { request } from './../../helpers'
import './../CreatePost/style.css'

const EditPost = () => {

  const { id } = useParams()
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()
  const url = `http://localhost:3001/posts/${id}`
  const {
    register,
    formState: {
      errors,
      isValid
    },
    handleSubmit
  } = useForm()

  const data = useData(url)

  const onSubmit = async (data) => {
    setLoad(true)
    try {
      await request(url, 'PUT', data)
      setLoad(false)
      navigate(`/${id}`, { replace: true })
    } catch (error) {
      console.log('ERROR >>', error.message)
      setLoad(false)
    }
  }

  return (
    <>
      <Header />
      <section className="create-post">
        {data
          ? <>
            <h1 className="create-post__header">Edit post</h1>
            {load === false
              ? <form className="create-post__form" onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="create-post__title"
                  type="text"
                  placeholder="Title"
                  autoFocus
                  defaultValue={data.title}
                  {...register('title', { required: true })}
                />
                {errors?.title && <p className="create-post__error">Поле обязательно для заполнения</p>}
                <textarea
                  className="create-post__text"
                  cols="30"
                  placeholder="Text ..."
                  rows="18"
                  defaultValue={data.body}
                  {...register('body', { required: true })}
                />
                {errors?.body && <p className="create-post__error">Поле обязательно для заполнения</p>}
                <button className="btn create-post__btn" type="submit" disabled={!isValid}>save</button>
              </form>
              : <div className="loader"><div className="lds-ripple"><div></div><div></div></div></div>
            }
          </>
          : <div className="loader"><div className="lds-ripple"><div></div><div></div></div></div>
        }
        <ToastContainer autoClose={5000} />
      </section>
    </>
  )
}

export default EditPost