/**
 * @param {object} params - Objeto de parámetros.
 * @param {boolean} params.handleStatus - Estado de manejo (debe ser booleano).
 * @param {function} params.setAnimation - Función para manejar el estado de animación.
 * @param {function} params.setClicStatus - Función para manejar el estado de clic.
 * @param {function} params.aditionalFunction - Función adicional a ejecutar.
 * @throws {TypeError} Si los tipos de datos no son los requeridos.
 */
const handleHover = ({
  handleStatus = false,
  setAnimation = () => { },
  setClicStatus = () => { },
  aditionalFunction = () => { }
} = {}) => {
  // Validaciones de tipo
  if (typeof handleStatus !== "boolean") {
    throw new TypeError("El parámetro 'handleStatus' debe ser de tipo booleano.");
  }
  if (typeof setAnimation !== "function") {
    throw new TypeError("El parámetro 'setAnimation' debe ser una función.");
  }
  if (typeof setClicStatus !== "function") {
    throw new TypeError("El parámetro 'setClicStatus' debe ser una función.");
  }
  if (typeof aditionalFunction !== "function") {
    throw new TypeError("El parámetro 'aditionalFunction' debe ser una función.");
  }

  // Lógica de la función
  if (handleStatus === false) {
    setAnimation(false);
    setTimeout(() => {
      setClicStatus(true);
      aditionalFunction();
    }, 200);
  }
};
export default handleHover