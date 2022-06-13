import { Link } from 'react-router-dom'
import Header from '../../components/header'
import useData from '../../hooks/useData'
import { ToastContainer } from 'react-toastify'
import './style.css'

const Posts = () => {

  const data = useData('http://localhost:3001/posts')

  return (
    <>
      <Header />
      <section className="posts">
        {data
          ? data.map(post =>
            <div className="posts_inner" key={post.id}>
              <div className="posts__title">{post.title}</div>
              <Link className=" btn posts__link" to={`${post.id}`}>more</Link>
            </div>
          )
          : <div className="loader"><div className="lds-ripple"><div></div><div></div></div></div>
        }
        <ToastContainer autoClose={5000} />
      </section>
    </>
  )
}

export default Posts