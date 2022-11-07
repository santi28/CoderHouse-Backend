const fs = require('fs');

class Contenedor {
  /** @typedef {{id: number, [key: string]: string}} CustomObject */

  filename = '';

  /** @param {string} filename */
  constructor(filename) {
    this.filename = filename ?? 'data.json'
    fs.writeFileSync(this.filename, '[]')
  }

  /** Guarda un objeto y devuelve su ID
   * @param {CustomObject} object
   * @returns {number}
   */
  save(object) {
    const objects = this.getAll();

    const id = (objects[objects.length - 1]?.id ?? 0) + 1

    const objectToSave = { id, ...object };
    const objectsToSave = JSON.stringify([ ...objects, objectToSave ])

    fs.writeFileSync(this.filename, objectsToSave)
    return id;
  }

  /** Devuelve un elemento en base a un ID
   * @param {number} id
   * @returns {CustomObject} 
   */
  getById(id) {
    const objects = this.getAll()
    return objects.find(object => object.id === id);
  }
  
  /** Retrona todos los elementos
   * @returns {CustomObject[]}
   */
  getAll() {
    const objects = fs.readFileSync(this.filename)
    return JSON.parse(objects)
  }
  
  /** Borra un elemento en base a su id
   * @param {number} id
   */
  deleteById(id) {
    const objects = this.getAll();
    const newObjectsArray = objects.filter(object => object.id !== id)

    fs.writeFileSync(this.filename, JSON.stringify(newObjectsArray))
  }
  
  /** Borra todos los elementos */
  deleteAll() {
    fs.writeFileSync(this.filename, '[]')
  }
}

const contenedor = new Contenedor('data.json')

const program1 = contenedor.save({ name: 'Chrome', type: 'navigator' })
console.log(`The program has been created successfully with id ${program1}`)

const program2 = contenedor.save({ name: 'Firefox', type: 'navigator' })
console.log(`The program has been created successfully with id ${program2}`)

const program3 = contenedor.save({ name: 'VSCode', type: 'code_editor' })
console.log(`The program has been created successfully with id ${program3}`)

console.log(contenedor.getAll())
console.log(contenedor.getById(3))

contenedor.deleteById(2)
console.log(contenedor.getAll())

contenedor.deleteAll()
console.log(contenedor.getAll())