
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Posts from './pages/Posts'
import Post from './pages/Post'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'

const App = () => {
  return (
    <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path=":id" element={<Post />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="*" element={<Posts />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
