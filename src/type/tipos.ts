export interface comentario {
    id: number,
  usuario: string
    texto: string
}

export interface posteo 
{
    id: number,
    url: string,
    usuario: string,
    caption: string,
    comentarios: comentario[],
    likes: number,
    liked: boolean,
    fecha: string
}

export interface UsuarioFijo 
{
    usuario: string,
    fotoPerfil: string,
    biografia: string,
    seguidores: number,
    seguidos: number,
    publicacionesNumero: number
}

//todas las fotos de perfil y eso las puse string xq la idea es en ese lugar poner la url de la imagen y que se muestre esa imagen, no se si es la mejor forma de hacerlo pero es lo que se me ocurrio
export interface Historias 
{
    id: number,
    fotoPerfil: string,
    usuario: string
}

