// src/components/PostModal/PostModal.tsx
import { posteo } from '../../type/tipos'
import { usuarioLogueado } from '../../data/dataDeUsuario'
import './PostModal.css'

interface Props {
  post: posteo
  onCerrar: () => void
  onToggleLike: (id: number) => void
}

const PostModal = ({ post, onCerrar, onToggleLike }: Props) => {
  return (
    // Fondo oscuro — click afuera cierra (igual que tu MovieDetail)
    <div className="modal-fondo" onClick={onCerrar}>

      {/* stopPropagation: click adentro NO cierra el modal */}
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>

        {/* Foto — lado izquierdo */}
        <div className="modal-foto-lado">
          <img src={post.url} alt={post.caption} className="modal-foto" />
        </div>

        {/* Info — lado derecho */}
        <div className="modal-info-lado">

          {/* Header con avatar y usuario */}
          <div className="modal-header">
            <img src={usuarioLogueado.fotoPerfil} alt={post.usuario} className="modal-avatar" />
            <strong className="modal-usuario">{post.usuario}</strong>
            <button className="modal-cerrar" onClick={onCerrar}>✕</button>
          </div>

          {/* Caption + comentarios */}
          <div className="modal-comentarios">
            <div className="modal-comentario">
              <strong>{post.usuario}</strong> {post.caption}
              <div className="modal-fecha">{post.fecha}</div>
            </div>

            {post.comentarios.map((comentario) => (
              <div key={comentario.id} className="modal-comentario">
                <strong>{comentario.usuario}</strong> {comentario.texto}
              </div>
            ))}
          </div>

          {/* Botones de acción */}
          <div className="modal-acciones">
            <button className="accion-btn" onClick={() => onToggleLike(post.id)}>
              {post.liked ? (
                <svg viewBox="0 0 24 24" fill="#ed4956" stroke="#ed4956" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              )}
            </button>

            <button className="accion-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </button>

            <button className="accion-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

          {/* Likes */}
          <div className="modal-likes">
            <strong>{post.likes.toLocaleString('es-AR')} Me gusta</strong>
          </div>

          {/* Input de comentario — visual, no funcional */}
          <div className="modal-agregar-comentario">
            <input type="text" placeholder="Agregá un comentario..." />
            <button>Publicar</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PostModal