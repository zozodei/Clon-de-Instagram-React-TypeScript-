import {type UsuarioFijo, type Historias} from "../type/tipos"

// importamos los tipos de type, para poder "instanciarlos", asi ya tenemos para esta sesion 

//creamos una instancia del objeto de usuarioFijo (es el dueño de nuestro instagram de gatitos)
export const usuarioLogueado : UsuarioFijo = 
{
      usuario: 'Flecha_Michis',
      fotoPerfil: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg', 
    biografia: '🐾 Amante de los gattitos | Fotógrafo felino | Buenos Aires 🇦🇷',
    seguidores: 847,
    seguidos: 123,
    publicacionesNumero: 12,

}

// IA: LAS URL QUE PUSE Y LAS DESCRIPCIONES Y USUARIOS. el resto lo hice. Ademas le pedi ayuda para poder importar los tipos, xq no me dejaba importarlos, me decia que no encontraba el modulo, y me dijo que tenia que poner export en los tipos y ahi si los podia importar
export const historias : Historias[] = [
    {
        id: 1,
        fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=101',
        usuario: 'ManunuGatito1'
    },
    {
        id: 2,
        fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=102',
        usuario: 'ZoeeFotos_Gatitos'
    },
    {
        id: 3,
        fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=103',
        usuario: 'Michi_Nao1'
    },      
    {  
        id: 4, 
        fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=104',
        usuario: 'Wolfus_fotografo'
    },
    {
        id: 5,
        fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=105',  
        usuario: 'Damian.GatiAsman'    
    },
    {
        id: 6, 
        fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=106',
        usuario: 'Fran_Gatito'
    },  
    {
        id: 7, 
        fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=107', 
        usuario: 'Mariana.Lopez3'
    },
    {       
        id: 8,
        fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=108', 
        usuario: 'Gatito_Fotografo'
    },
    {
        id: 9,  
        fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=109',
        usuario: 'FotosDivertidad'
    },      
    {
        id: 10, 
        fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=110',
        usuario: 'Club.De.Fans.gatos'
    },
    {
        id: 11,
        fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=111',
        usuario: 'Gatitos_Felices'
    }
]
