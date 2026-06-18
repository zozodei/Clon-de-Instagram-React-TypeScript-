// src/components/StoriesBar/StoriesBar.tsx
import { historias } from "../../data/dataDeUsuario"
import { usuarioLogueado } from "../../data/dataDeUsuario"


import './StoriesBar.css'

const StoriesBar = () => {
  return (
    <div className="stories-bar">

      {/* Tu historia — la primera siempre */}
      <div className="story-item">
        <div className="story-anillo tuya">
          <img src={usuarioLogueado.fotoPerfil} alt="tu historia" className="story-foto" />
        </div>
        <span className="story-usuario">Tu historia</span>
      </div>

      {/* Historias de los demás — vienen de datausuario.ts */}
      {historias.map((historia) => (
        <div key={historia.id} className="story-item">
          <div className="story-anillo">
            <img src={historia.fotoPerfil} alt={historia.usuario} className="story-foto" />
          </div>
          <span className="story-usuario">{historia.usuario}</span>
        </div>
      ))}

    </div>
  )
}

export default StoriesBar