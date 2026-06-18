// src/components/StoriesBar/StoriesBar.tsx
import { historias, usuarioLogueado } from "../../data/dataDeUsuario"
import './StoriesBar.css'

// le llegan los datos que ya existen instanciados de los objetos de la interface

const StoriesBar = () => {
  return (
    <div className="stories-bar">

      {/* IA: lo hice para mostrar mi historia primero, las clases son para la mejora del estilo */}
      <div className="story-item">
        <div className="story-anillo tuya">
          {/* pongo la foto del usuario de data que importe */}
          <img src={usuarioLogueado.fotoPerfil} alt="tu historia" className="story-foto" />
        </div>
        {/* pero en vez de poner el nombre de usuario pongo "tu historia" */}
        <span className="story-usuario">Tu historia</span>
      </div>

      {/* recorro el array de historias y creo un div por cada historia
          le pongo el key id para que react pueda identificar cada elemento
          IA: me dijo que tenia que poner el key para que react pueda identificar cada elemento */}
      {historias.map((historia) => (
        <div key={historia.id} className="story-item">
          <div className="story-anillo">
            {/* del objeto saco la foto de perfil y el nombre de usuario para mostrarlo en cada historia
                le pongo el alt para que si no se carga la imagen se muestre el nombre del usuario */}
            <img src={historia.fotoPerfil} alt={historia.usuario} className="story-foto" />
          </div>
          {/* muestro el nombre del usuario abajo del circulito de la historia */}
          <span className="story-usuario">{historia.usuario}</span>
        </div>
      ))}

    </div>
  )
}

export default StoriesBar