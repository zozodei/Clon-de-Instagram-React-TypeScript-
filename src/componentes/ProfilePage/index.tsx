// src/components/ProfilePage/ProfilePage.tsx
import type { posteo, UsuarioFijo } from '../../type/tipos'
import './ProfilePage.css'

interface Props {
  usuario: UsuarioFijo
  posteos: posteo[]
  onClickPost: (post: posteo) => void
}

const ProfilePage = ({ usuario, posteos, onClickPost }: Props) => {
  return (
    <div className="perfil">

      {/* Cabecera del perfil */}
      <div className="perfil-header">
        <img src={usuario.fotoPerfil} alt={usuario.usuario} className="perfil-avatar" />

        <div className="perfil-info">
          <div className="perfil-fila-top">
            <h2 className="perfil-usuario">{usuario.usuario}</h2>
            <button className="perfil-btn-editar">Editar perfil</button>
          </div>

          <div className="perfil-stats">
            <div className="perfil-stat">
              <strong>{usuario.publicacionesNumero}</strong>
              <span>publicaciones</span>
            </div>
            <div className="perfil-stat">
              <strong>{usuario.seguidores.toLocaleString('es-AR')}</strong>
              <span>seguidores</span>
            </div>
            <div className="perfil-stat">
              <strong>{usuario.seguidos}</strong>
              <span>seguidos</span>
            </div>
          </div>

          <p className="perfil-bio">{usuario.biografia}</p>
        </div>
      </div>

      {/* Tabs — solo visual */}
      <div className="perfil-tabs">
        <button className="perfil-tab activo">PUBLICACIONES</button>
        <button className="perfil-tab">GUARDADOS</button>
        <button className="perfil-tab">ETIQUETADOS</button>
      </div>

      {/* Grilla de fotos */}
      <div className="perfil-grilla">
        {posteos.map((post) => (
          <div
            key={post.id}
            className="perfil-grilla-item"
            onClick={() => onClickPost(post)}
          >
            <img src={post.url} alt={post.caption} />

            {/* Overlay con likes y comentarios al hacer hover */}
            <div className="perfil-grilla-overlay">
              <span>
                <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
                {post.likes}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
                {post.comentarios.length}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ProfilePage