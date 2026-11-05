// Datos de ejemplo de la cafetería (ficticia). Cambia aquí carta, horarios y contacto.

export type MenuItem = { name: string; desc: string; price: number; tag?: string }
export type MenuGroup = { title: string; items: MenuItem[] }

export const cafe = {
  name: 'Café La Esquina',
  claim: 'Café de especialidad y bollería casera, a dos pasos de tu casa.',
  address: 'Calle del Olivo 12, 28012 Madrid',
  phone: '+34 910 000 000',
  email: 'hola@cafelaesquina.example',
  mapsUrl: 'https://www.openstreetmap.org/search?query=Calle%20del%20Olivo%2012%20Madrid',
}

export const menu: MenuGroup[] = [
  {
    title: 'Cafés',
    items: [
      { name: 'Espresso', desc: 'Tueste medio de origen Colombia.', price: 1.6 },
      { name: 'Café con leche', desc: 'Con leche fresca o bebida de avena.', price: 2.2 },
      { name: 'Flat white', desc: 'Doble ristretto y leche texturizada.', price: 2.8, tag: 'Favorito' },
      { name: 'Cold brew', desc: '18 horas de infusión en frío.', price: 3.2 },
    ],
  },
  {
    title: 'Desayunos',
    items: [
      { name: 'Tostada de tomate', desc: 'Pan de masa madre, AOVE y tomate rallado.', price: 2.9 },
      { name: 'Tostada de aguacate', desc: 'Con huevo poché y semillas.', price: 5.5, tag: 'Nuevo' },
      { name: 'Yogur con granola', desc: 'Granola casera y fruta de temporada.', price: 4.2 },
    ],
  },
  {
    title: 'Dulces caseros',
    items: [
      { name: 'Croissant de mantequilla', desc: 'Horneado cada mañana.', price: 1.9 },
      { name: 'Bizcocho de limón', desc: 'La receta de la abuela.', price: 2.5 },
      { name: 'Tarta de queso', desc: 'Cremosa, al horno.', price: 4.5, tag: 'Favorito' },
    ],
  },
]

export const hours = [
  { days: 'Lunes a viernes', time: '7:30 – 19:30' },
  { days: 'Sábados', time: '9:00 – 20:00' },
  { days: 'Domingos', time: '9:00 – 14:00' },
]

export const reviews = [
  { text: 'El mejor flat white del barrio y siempre con una sonrisa.', author: 'Lucía, vecina' },
  { text: 'Vengo a trabajar las mañanas: buen wifi, buena música y mejor tarta de queso.', author: 'Andrés' },
  { text: 'Los croissants se acaban pronto. Por algo será.', author: 'Marta' },
]
