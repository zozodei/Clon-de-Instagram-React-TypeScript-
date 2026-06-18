// src/components/Feed/Feed.tsx
import type { posteo } from '../../type/tipos'
import PostCard from "../PostCard"
import './Feed.css'

interface Props {
  posteos: posteo[] // le llegan el array de todos los posteos
  onClickPost: (post: posteo) => void // cuando clickeamos un posteo y queremos entrar a un modal
  onToggleLike: (id: number) => void // los likes
}

const Feed = ({ posteos, onClickPost, onToggleLike }: Props) => {

  // por si no hay ningun posteo en el array, aparece esto asi no queda vacio
  if (posteos.length === 0) {
    return <p className="feed-cargando">Cargando publicaciones...</p>
  }

  return (
    // mapea el array de posteos y le manda a PostCard el posteo para que lo muestre
    // le manda la funcion para dar like y para abrir el modal
    // Feed es mas un intermediario que otra cosa
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