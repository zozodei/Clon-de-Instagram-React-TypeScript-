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
    const [posteos, setPosteos] = useState<posteo[]>([])
  const [vistaActual, setVistaActual] = useState<'feed' | 'perfil'>('feed')
  const [postSeleccionado, setPostSeleccionado] = useState<posteo | null>(null)
  
   useEffect(() => {
    const traerGatos = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
          params: {
            limit: 12,
            api_key: import.meta.env.VITE_CAT_API_KEY,
          }
        })

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

        setPosteos(posteoGenerados)
      } catch (error) {
        console.error('Error al traer los gatos:', error)
      }
    }

    traerGatos()
  }, [])

  // Recorre todos los posteos y solo modifica el que tiene el id que recibió
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
