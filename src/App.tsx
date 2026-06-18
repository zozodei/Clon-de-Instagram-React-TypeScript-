import { useState, useEffect } from 'react'
import axios from 'axios'
import type { posteo } from './type/tipos'
import { usuarioLogueado } from './data/dataDeUsuario'
import Sidebar from './componentes/SideBar'
import StoriesBar from './componentes/StoriesBar'
import Feed from './componentes/Feed'
import ProfilePage from './componentes/ProfilePage'
import PostModal from './componentes/PostModal'
import './App.css'

// importamos las librerias y los componentes que vamos a usar, tmb los tipos de usuario y demas

// todas estas constantes son las que vamos a usar para los comentarios y los posteos en general
// los captions son basicamente lo que ponemos abajo de cada posteo, es como lo que "opinamos de la foto"
// los usuarios son los nombres de usuario que van a aparecer en cada posteo
// los comentarios fijos son algunos comentarios que van a aparecer en cada posteo, para que no se vea tan vacio
// IA: RELLENAR LOS CAMPOS.

const CAPTIONS = [
  'Cuando es lunes pero igual estás feliz 😸',
  'El sol me llama pero el sueño me retiene 😴',
  'Listo para conquistar el mundo 🐾',
  'Nadie me entiende como mi almohada 💤',
  'Día perfecto para no hacer nada 🌿',
  'Estoy en modo zen 🧘',
  'Juzgándote en silencio desde aquí 👀',
  'Detective en servicio activo 🔍',
  'Cuando encontrás el rayo de sol perfecto ☀️',
  'Solo paso por aquí a ser hermoso 🌟',
  'No me interrumpas, estoy ocupado 💅',
  'El universo me debe una siesta 😤',
]

const USUARIOS = [
  'michi_lover', 'gato_curioso', 'pelusa_oficial', 'felix_jr',
  'bigotes_pro', 'ronroneo_max', 'zarpazo_suave', 'michi_zen',
  'gatito_bueno', 'patas_lindas', 'colita_tiesa', 'miau_forever',
]

const COMENTARIOS_FIJOS = [
  { id: 1, usuario: 'gato_fan_01', texto: '¡Qué hermoso! 😍' },
  { id: 2, usuario: 'luna_cat', texto: 'Me robaste el corazón 🐾' },
  { id: 3, usuario: 'michi_watcher', texto: 'Definitivamente el mejor del día' },
]

function App() {

  // Guarda los posteos del feed que traemos de la API, arranca con un array vacio
  // solo pueden formar parte los objetos con la forma de la interface posteo
  const [posteos, setPosteos] = useState<posteo[]>([])

  // IA: Controla que pantalla se esta viendo (arranca con feed por default)
  const [vistaActual, setVistaActual] = useState<'feed' | 'perfil'>('feed')

  // Que posteo esta clickeado, empieza en null
  // Aca se guarda el posteo entero (en formato de la interface), se cierra y vuelve a null
  const [postSeleccionado, setPostSeleccionado] = useState<posteo | null>(null)

  // IA: trae los posteos de la api, la primera vez que abro todo
  useEffect(() => {

    const traerGatos = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
          params: {
            limit: 12,
            api_key: import.meta.env.VITE_CAT_API_KEY,
          }
        })

        // genera posteos en base a la respuesta de la API (Parte con IA aca tmb), pero la api solo me devuelve ID y URL
        // el map es para transformar cada imagen y id que me devuelve la api en un posteo con todos los campos
        // index es el num de posteo (para el caption, usuario y demas)
        const posteoGenerados: posteo[] = response.data.map(
          (imagen: { id: string; url: string }, index: number) => ({
            id: index + 1,
            url: imagen.url,
            usuario: USUARIOS[index],
            caption: CAPTIONS[index],
            likes: Math.floor(Math.random() * 500) + 50,
            liked: false,
            comentarios: COMENTARIOS_FIJOS,
            fecha: new Date(Date.now() - index * 3600000).toLocaleDateString('es-AR'),
          })
        )

        // guarda el array de los posteos generados en el useState para poder mandarlos y usarlos
        setPosteos(posteoGenerados)

      } catch (error) {
        console.error('Error al traer los gatos:', error)
      }
    }

    // llamo a la funcion para que se ejecute, si no no se ejecuta nunca y no traigo los gatos
    traerGatos()

  }, [])
  // el [] hace que se ejecute solo la primera vez que se cargan los componentes

  // Recorre todos los posteos y solo modifica el que tiene el id que recibió
  // IA: esta funcion es para cuando le das like a un posteo, cambia el estado de liked y actualiza el numero de likes
  // se llama desde el feed y desde el modal, por eso esta en el componente principal, para que lo puedan usar ambos
  const toggleLike = (id: number) => {
    setPosteos(
      posteos.map((post) => {
        if (post.id !== id) return post
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        }
      })
    )
  }

  // los classNames me los armo la IA asi podia tener estructura para hacer el css
  return (
    <>
      <div className="app-layout">
        <Sidebar
          vistaActual={vistaActual}
          onNavegar={setVistaActual}
          fotoPerfil={usuarioLogueado.fotoPerfil}
        />

        <main className="app-main">
          {vistaActual === 'feed' ? (
            <>
              <StoriesBar />
              <Feed
                posteos={posteos}
                onClickPost={setPostSeleccionado}
                onToggleLike={toggleLike}
              />
            </>
          ) : (
            <ProfilePage
              usuario={usuarioLogueado}
              posteos={posteos}
              onClickPost={setPostSeleccionado}
            />
          )}
        </main>

        {/* cuando hay un posteo seleccionado y no es null, muestra el modal */}
        {postSeleccionado && (
          <PostModal
            post={postSeleccionado}
            onCerrar={() => setPostSeleccionado(null)}
            onToggleLike={toggleLike}
          />
        )}
      </div>
    </>
  )
}

export default App