// Datos hardcodeados de pruebas y sus retos (challenges)
// Cada reto sigue esta estructura de ejemplo:
// {
//  title: 'Two Sum',
//  difficulty: 'Easy',
//  tags: ['arrays','hashmap'],
//  timeLimit: 1500,
//  memoryLimit: 256,
//  description: 'Dado un arreglo de enteros y un target...'
// }

export const pruebas = [
  {
    id: 1,
    name: 'Prueba de Algoritmos',
    description: 'Colección de retos básicos de algoritmos.',
    challenges: [
      {
        title: 'Two Sum',
        difficulty: 'Easy',
        tags: ['arrays', 'hashmap'],
        timeLimit: 1500,
        memoryLimit: 256,
        description: 'Dado un arreglo de enteros y un target, encuentra dos índices cuyos valores sumen el target.'
      },
      {
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        tags: ['linked-list'],
        timeLimit: 1000,
        memoryLimit: 128,
        description: 'Invierte una lista enlazada simple y devuelve la nueva cabeza.'
      }
    ]
  },
  {
    id: 2,
    name: 'Prueba de Estructuras',
    description: 'Retos sobre estructuras de datos comunes.',
    challenges: [
      {
        title: 'Stack With Min',
        difficulty: 'Medium',
        tags: ['stack', 'design'],
        timeLimit: 1000,
        memoryLimit: 128,
        description: 'Implementa una pila que soporte obtener el mínimo en O(1).'
      }
    ]
  }
]
