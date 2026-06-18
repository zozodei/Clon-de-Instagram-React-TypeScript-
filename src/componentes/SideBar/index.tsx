// src/components/Sidebar/Sidebar.tsx
import './Sidebar.css'

// IA: le digo que tiene que recibir, todo esto es lo que le mandamos antes desde app.tsx
// el estado de la vista actual para saber que boton esta activo
// la funcion para cambiar la vista y la foto de perfil para mostrarla en el boton de perfil
interface Props {
  vistaActual: 'feed' | 'perfil'
  onNavegar: (vista: 'feed' | 'perfil') => void // es la funcion que cambia la vista al apretar
  fotoPerfil: string
}

// Sidebar va a ser el que contenga la info de todo lo imp para esto
// aca vemos que tiene que ser igual a la interface props
const Sidebar = ({ vistaActual, onNavegar, fotoPerfil }: Props) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Instagram</div>

      <nav className="sidebar-nav">

        <button
          className={`sidebar-item ${vistaActual === 'feed' ? 'activo' : ''}`}
          onClick={() => onNavegar('feed')}
        >
          {/* IA: aca puse los iconos de cada boton, los busque en una pagina de iconos svg gratis
              les puse la clase sidebar-icono para poder darles estilo desde el css
              y el span es para mostrar el nombre del boton al lado del icono */}
          <svg className="sidebar-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
            <path d="M9 21V12h6v9"/>
          </svg>
          <span>Inicio</span>
        </button>

        <button className="sidebar-item">
          <svg className="sidebar-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <span>Buscar</span>
        </button>

        <button className="sidebar-item">
          <svg className="sidebar-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/>
            <rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/>
          </svg>
          <span>Explorar</span>
        </button>

        <button className="sidebar-item">
          <svg className="sidebar-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          </svg>
          <span>Reels</span>
        </button>

        <button className="sidebar-item">
          <svg className="sidebar-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          <span>Mensajes</span>
        </button>

        <button className="sidebar-item">
          <svg className="sidebar-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
          <span>Notificaciones</span>
        </button>

        <button className="sidebar-item">
          <svg className="sidebar-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
          </svg>
          <span>Crear</span>
        </button>

        {/* si la vista actual es perfil se agrega la clase activo para el estilo
            y cuando apretamos llama a onNavegar y le manda 'perfil' para cambiar la vista */}
        <button
          className={`sidebar-item ${vistaActual === 'perfil' ? 'activo' : ''}`}
          onClick={() => onNavegar('perfil')}
        >
          <img src={fotoPerfil} alt="perfil" className="sidebar-avatar" />
          <span>Perfil</span>
        </button>

      </nav>

      <div className="sidebar-mas">
        <svg className="sidebar-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
        <span>Más</span>
      </div>
    </aside>
  )
}

export default Sidebar