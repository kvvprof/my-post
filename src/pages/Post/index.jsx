import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from '../../components/header'
import useData from '../../hooks/useData'
import { request } from './../../helpers'
import './style.css'

const Post = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const url = `http://localhost:3001/posts/${id}`

  const data = useData(url)

  const deletePost = async () => {
      await request(url, 'DELETE')
      navigate(`/`, { replace: true })
  }

  return (
    <>
      <Header />
      <section className="post">
        {data
          ? <>
            <div className="post__body">
              <div className="post__title">{data.title}</div>
              <div className="post__text">{data.body}</div>
            </div>
            <div className="post__tools">
              <Link className="btn post__edit" to={`/edit/${data.id}`}>edit</Link>
              <button className="btn post__delete" onClick={deletePost}>delete</button>
            </div>
          </>
          : <div className="loader"><div className="lds-ripple"><div></div><div></div></div></div>
        }
        <ToastContainer autoClose={5000} />
      </section>
    </>
  )
}

export default Post