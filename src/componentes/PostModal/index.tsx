
import type { posteo } from '../../type/tipos'
import { usuarioLogueado } from '../../data/dataDeUsuario'
import './PostModal.css'

interface Props {
  post: posteo // posteo seleccionado
  onCerrar: () => void // funcion para que vuelva a null el post seleccionado y se cierre el modal
  onToggleLike: (id: number) => void // para likear el posteo, le paso el id para que sepa cual es el posteo que tiene que cambiar el estado de liked y likes
}

const PostModal = ({ post, onCerrar, onToggleLike }: Props) => {
  return (
    // IA: esto lo hice para que cuando apretás afuera del modal se cierre
    // el stopPropagation es para que no se nos escape un click
    <div className="modal-fondo" onClick={onCerrar}>

      {/* stopPropagation: click adentro NO cierra el modal */}
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>

        {/* IA: como organizar la foto para que quede ordenada y sea mejor estilizada */}
        <div className="modal-foto-lado">
          <img src={post.url} alt={post.caption} className="modal-foto" />
        </div>

        {/* info del modal */}
        <div className="modal-info-lado">

          {/* otra opcion para cerrar el modal, ademas me aparece la foto de perfil
              y el nombre del usuario de ese posteo en especifico */}
          <div className="modal-header">
            <img src={usuarioLogueado.fotoPerfil} alt={post.usuario} className="modal-avatar" />
            <strong className="modal-usuario">{post.usuario}</strong>
            <button className="modal-cerrar" onClick={onCerrar}>✕</button>
          </div>

          {/* los comentarios que son los mismos de siempre, pero tmb con la fecha de la publicacion */}
          <div className="modal-comentarios">
            <div className="modal-comentario">
              <strong>{post.usuario}</strong> {post.caption}
              <div className="modal-fecha">{post.fecha}</div>
            </div>

            {/* mapeo los comentarios por default que tengo
                les pongo una key para que react los pueda identificar */}
            {post.comentarios.map((comentario) => (
              <div key={comentario.id} className="modal-comentario">
                <strong>{comentario.usuario}</strong> {comentario.texto}
              </div>
            ))}
          </div>

          {/* la funcionalidad del boton de like, como llamo a la funcion
              y como cambia el color dependiendo si esta o no likeado */}
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

            {/* estos son los botones de favorito y enviar, que no son funcionales de verdad */}
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

          {/* veo la cantidad de likes que tengo y lo muestro */}
          <div className="modal-likes">
            <strong>{post.likes.toLocaleString('es-AR')} Me gusta</strong>
          </div>

          {/* este es el input de comentario que no es funcional pero si se puede escribir
              pero no se manda realmente el comentario */}
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