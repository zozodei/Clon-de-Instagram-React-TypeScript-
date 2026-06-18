import type { posteo } from '../../type/tipos'
import { usuarioLogueado } from '../../data/dataDeUsuario'
import './PostCard.css'

interface Props {
  post: posteo
  onClickImagen: () => void
  onToggleLike: () => void
}

const PostCard = ({ post, onClickImagen, onToggleLike }: Props) => {

  // IA: organizacion del html con copilot
  return (
    <article className="postcard">

      {/* es la parte de arriba del posteo que te dice el usuario y mas
          los ... son decorativos xq en instagram aparece asi por si queres guardar la foto */}
      <div className="postcard-header">
        <img src={usuarioLogueado.fotoPerfil} alt={post.usuario} className="postcard-avatar" />
        <div className="postcard-header-info">
          <span className="postcard-usuario">{post.usuario}</span>
          <span className="postcard-fecha">{post.fecha}</span>
        </div>
        <button className="postcard-mas">···</button>
      </div>

      {/* la foto y el click que llama a la funcion y abre el modal
          en toda la imagen se puede clickear */}
      <img
        src={post.url}
        alt={post.caption}
        className="postcard-foto"
        onClick={onClickImagen}
      />

      {/* iconos de los posteos, el unico usable de verdad es el de like */}
      <div className="postcard-acciones">
        <div className="postcard-acciones-izq">

          {/* lo mismo que en modal, si apretamos se cambia el bool de liked
              y aumenta los likes y el corazon aparece vacio o lleno */}
          <button className="accion-btn" onClick={onToggleLike}>
            {post.liked ? (
              // corazon lleno (rojo) cuando esta likeado
              <svg viewBox="0 0 24 24" fill="#ed4956" stroke="#ed4956" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            ) : (
              // corazon vacio cuando no esta likeado
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            )}
          </button>

          {/* comentario, se clickea y onClickImagen te lleva al modal */}
          <button className="accion-btn" onClick={onClickImagen}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </button>

          {/* compartir */}
          <button className="accion-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>

        </div>

        {/* guardar — a la derecha */}
        <button className="accion-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
          </svg>
        </button>
      </div>

      {/* likes */}
      <div className="postcard-likes">
        <strong>{post.likes.toLocaleString('es-AR')} Me gusta</strong>
      </div>

      <div className="postcard-caption">
        <strong>{post.usuario}</strong> {post.caption}
      </div>

      {/* link para ver comentarios — abre el modal */}
      <button className="postcard-ver-comentarios" onClick={onClickImagen}>
        Ver los {post.comentarios.length} comentarios
      </button>

    </article>
  )
}

export default PostCard