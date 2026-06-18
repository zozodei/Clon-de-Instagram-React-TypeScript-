// src/components/Feed/Feed.tsx
import type { posteo } from '../../type/tipos'

import PostCard from "../PostCard"         
import './Feed.css'


interface Props {
  posteos: posteo[]
  onClickPost: (post: posteo) => void
  onToggleLike: (id: number) => void
}

const Feed = ({ posteos, onClickPost, onToggleLike }: Props) => {
  if (posteos.length === 0) {
    return <p className="feed-cargando">Cargando publicaciones...</p>
  }

  return (
    <div className="feed">
      {posteos.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onClickImagen={() => onClickPost(post)}
          onToggleLike={() => onToggleLike(post.id)}
        />
      ))}
    </div>
  )
}

export default Feed