import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header'
import { request } from '../../helpers'
import uniqid from 'uniqid'
import './style.css'

const CreatePost = () => {
  const navigate = useNavigate()
  const [load, setLoad] = useState(false)

  const {
    register,
    formState: {
      errors,
      isValid
    },
    handleSubmit
  } = useForm({ mode: 'onChange' })

  const onSubmit = async (data) => {
    setLoad(true)
    try {
      const id = uniqid()
      await request('http://localhost:3001/posts', 'POST', { id, ...data })
      setLoad(false)
      navigate(`/${id}`, { replace: true })
    } catch (error) {
      setLoad(false)
      console.log('ERROR >>', error.message)
    }
  }

  return (
    <>
      <Header />
      <section className="create-post">
        <h1 className="create-post__header">Create post</h1>
        {load === false
          ? <form className="create-post__form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="create-post__title"
              type="text"
              placeholder="Title"
              autoFocus
              {...register('title', { required: true })}
            />
            {errors?.title && <p className="create-post__error">Поле обязательно для заполнения</p>}
            <textarea
              className="create-post__text"
              cols="30"
              placeholder="Text ..."
              rows="18"
              {...register('body', { required: true })}
            />
            {errors?.body && <p className="create-post__error">Поле обязательно для заполнения</p>}
            <button className="btn create-post__btn" type="submit" disabled={!isValid}>create</button>
          </form>
          : <div className="loader"><div className="lds-ripple"><div></div><div></div></div></div>
        }
      </section>
    </>
  )
}

export default CreatePost