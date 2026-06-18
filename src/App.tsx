import { useState } from 'react'

import axios from 'axios'

import type {posteo} from './type/tipos'
import {useEffect} from 'react'
import {usuarioLogueado} from './data/dataDeUsuario'
import Sidebar from './componentes/SideBar'
import StoriesBar from './componentes/StoriesBar'
import PostCard from './componentes/PostCard'
import Feed from './componentes/Feed'
import ProfilePage from './componentes/ProfilePage'
import PostModal from './componentes/PostModal'
import './App.css'

// importamos las librerias y los componentes que vamos a usar, tmb los tipos de usuario y demas 

// todas estas constantes son las que vamos a usar para los comentarios y los posteos en general
// los camptions son basicamente son lo que ponemos abajo de cada posteo, es como lo que "opinamos de la foto"
// los usuarios son los nombres de usuario que van a aparecer en cada posteo, 
//  los comentarios fijos son algunos comentarios que van a aparecer en cada posteo, para que no se vea tan vacio, y para que se vea mas realista, ya que si no tendriamos posteos sin comentarios y eso no es muy realista 

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

    const [posteos, setPosteos] = useState<posteo[]>([]) // Guarda los posteos del feed que traemos de la Api, arranca con un array vacio
    // solo pueden formar partes los objetos con la forma de la interface posteo


    // IA: Controla que pantalla se esta viendo (arranca con feed x default)
      const [vistaActual, setVistaActual] = useState<'feed' | 'perfil'>('feed')


  const [postSeleccionado, setPostSeleccionado] = useState<posteo | null>(null)
  // que posteo esta clickeado, empieza en null. ACa se guarda el posteo entero (en formato de la interface, se cierra y vuelve a null) 
  

// IA: tare los posteos de la api, la primera vez que abro todo
   useEffect(() => {

    //a
    const traerGatos = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
          params: {
            limit: 12,
            api_key: import.meta.env.VITE_CAT_API_KEY,
          }
        }) 

    

// genera posteos en base a la respuesta de la API (Parte con IA aca tmb), pero la api solo me deuvelve ID y URL. 
// el map es para tranformar cada imagen y id que me devuelve la api en un posteo con todos los campos
        const posteoGenerados: posteo[] = response.data.map(
          (imagen: { id: string; url: string }, index: number) => ({ // index  es el num de posteo (para el caption, usuario y demas)
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
        setPosteos(posteoGenerados)
        // guarda el array de los psoteos generados en el use state para poder mandarlos e usarlos

      } catch (error) {
        console.error('Error al traer los gatos:', error)
      }
    }

    traerGatos() // llamo a la funcion para que se ejecute, si no no se ejecuta nunca, y no traigo los gatos

  }, []) // esto hace que se ejecute solo la primera vez que se hacen los componentes y se corre el programa 



  // Recorre todos los posteos y solo modifica el que tiene el id que recibió
  // IA: esta funcion es para cuando le das like a un posteo, cambia el estado de liked y actualiza el numero de likes, se llama desde el feed y desde el modal, por eso esta en el componente principal, para que lo puedan usar ambos componentes
  
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


// los class name me los armo la IA asi podria tener entructura para hacer el css
  return (
    <>
       <div className="app-layout">
      <Sidebar

        vistaActual={vistaActual} // es para ver que se ve apretado, si perfil o feed
        onNavegar={setVistaActual} // para cambiar la vista actual, se lo paso al sidebar para que pueda cambiarlo desde ahi (el use state)
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

// esto es cuando hay un modal seleccionado y no es null 
      {postSeleccionado && (
        <PostModal
          post={postSeleccionado} // el use state de post seleccionado guarda el posteo entero, asi que se lo paso entero al modal para que pueda mostrar toda la info
          onCerrar={() => setPostSeleccionado(null)} // cuando se cierra el post vuelve a null 
          onToggleLike={toggleLike}
        />
      )}
    </div>


    </>
  )
}

export default App
