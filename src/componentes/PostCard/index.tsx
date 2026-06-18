// src/components/PostCard/PostCard.tsx
import type { posteo } from '../../type/tipos'
import { usuarioLogueado } from '../../data/dataDeUsuario'
import './PostCard.css'

interface Props {
  post: posteo
  onClickImagen: () => void
  onToggleLike: () => void
}

const PostCard = ({ post, onClickImagen, onToggleLike }: Props) => {
  return (
    <article className="postcard">

      {/* Cabecera: avatar + nombre + puntitos */}
      <div className="postcard-header">
        <img src={usuarioLogueado.fotoPerfil} alt={post.usuario} className="postcard-avatar" />
        <div className="postcard-header-info">
          <span className="postcard-usuario">{post.usuario}</span>
          <span className="postcard-fecha">{post.fecha}</span>
        </div>
        <button className="postcard-mas">···</button>
      </div>

      {/* Foto — click abre el modal */}
      <img
        src={post.url}
        alt={post.caption}
        className="postcard-foto"
        onClick={onClickImagen}
      />

      {/* Botones de acción — igual a la captura */}
      <div className="postcard-acciones">
        <div className="postcard-acciones-izq">

          {/* Corazón — cambia según post.liked */}
          <button className="accion-btn" onClick={onToggleLike}>
            {post.liked ? (
              // Corazón lleno (rojo) cuando está likeado
              <svg viewBox="0 0 24 24" fill="#ed4956" stroke="#ed4956" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            ) : (
              // Corazón vacío cuando no está likeado
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            )}
          </button>

          {/* Comentario */}
          <button className="accion-btn" onClick={onClickImagen}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </button>

          {/* Compartir */}
          <button className="accion-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>

        </div>

        {/* Guardar — a la derecha */}
        <button className="accion-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
          </svg>
        </button>
      </div>

      {/* Likes */}
      <div className="postcard-likes">
        <strong>{post.likes.toLocaleString('es-AR')} Me gusta</strong>
      </div>

      {/* Caption */}
      <div className="postcard-caption">
        <strong>{post.usuario}</strong> {post.caption}
      </div>

      {/* Link para ver comentarios — abre el modal */}
      <button className="postcard-ver-comentarios" onClick={onClickImagen}>
        Ver los {post.comentarios.length} comentarios
      </button>

    </article>
  )
}

export default PostCard