import _ from 'lodash';

/**
 * Checks if any of the provided inputs are "bad" values.
 * A value is considered "bad" if it is one of the following:
 * - `null` or `undefined`
 * - An empty string (`''`) or a string with only whitespace (`'   '`)
 * - An empty object (`{}`) if `secondLevel` is not enabled
 * - If `secondLevel: true` is passed as the last argument, it also checks if any of the **values of the keys** 
 *   inside an object are "bad" (e.g., `{ key: null }`, `{ key: '' }`, or `{ key: '   ' }`).
 * 
 * @param  {...any} inputs - The values to check. The last input can be an options object `{ secondLevel: true }`.
 * @returns {boolean} - Returns `true` if at least one "bad" value is found, otherwise `false`.
 */
const isBad = (...inputs) => {
  // Extraer la opción secondLevel si existe
  const options = inputs[inputs.length - 1];
  const secondLevel = _.isObject(options) && options.secondLevel === true;
  const valuesToCheck = secondLevel ? inputs.slice(0, -1) : inputs;

  return valuesToCheck.some(input =>
    _.isNil(input) ||
    input === '' ||
    (_.isObject(input) &&
      _.isEmpty(input)
    ) ||
    (_.isObject(input) &&
      secondLevel &&
      !_.isEmpty(input) &&
      Object.values(input).some(value =>
        _.isNil(value) || value === '' || (_.isString(value) && value.trim() === '')
      )
    ) ||
    (_.isString(input) && input.trim() === '')
  );
};


/**
 * Checks if any of the provided inputs (can be multiple) or their nested properties are "bad" (null, undefined, empty string, or falsy).
 * @param {...any} inputs - One or more inputs to check (objects, arrays, or primitives).
 * @returns {boolean} - Returns true if any of the inputs or their nested properties are "bad", otherwise false.
 */
const isAnyBad = (...inputs) =>
  inputs.some(input =>
    // Check if the input itself is "bad"
    _.isNil(input) || input === '' || _.isEmpty(input) ||
    // If the input is an object, recursively check its properties
    (_.isObject(input) && _.some(input, value => isAnyBad(value)))
  );

/**
 * Returns an array of the "bad" values (null, undefined, empty string, or falsy values) from the provided inputs.
 * It also checks nested properties if the input is an object.
 * @param {...any} inputs - One or more inputs to check (objects, arrays, or primitives).
 * @returns {Array} - Returns an array containing the "bad" values.
 */
const whoIsBad = (...inputs) => {
  const badValues = [];

  inputs.forEach(input => {
    if (_.isNil(input) || input === '' || _.isEmpty(input)) {
      badValues.push(input);
    } else if (_.isObject(input)) {
      // Recursively check nested objects or arrays for bad values
      _.forOwn(input, (value, key) => {
        if (isAnyBad(value)) {
          badValues.push({ [key]: value });
        }
      });
    }
  });

  return badValues;
};

/**
 * 
 * @param {*} obj 
 * @param {*} propToExclude 
 * @returns 
 */
const excludeProperty = (obj, propToExclude) => {
  // Verificar si el objeto es nulo o si la propiedad a excluir no existe
  if (isBad(obj) || !(propToExclude in obj)) {
    return null; // Devolver null si el objeto es nulo o la propiedad no existe
  }

  return Object.keys(obj).reduce((acc, key) => {
    // Excluir la propiedad si es igual a propToExclude o si su valor es nulo
    if (key !== propToExclude && obj[key] !== null) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};


/**
 * 
 * @param  {...any} fns 
 * @param  {...Function} param.fns function to test
 * @param  {boolean} param.native false to arrow functions and true to native functions 
 * @returns 
 */
const isFunction = (...fns) => {
  const native = typeof fns[fns.length - 1] === 'boolean' ? fns.pop() : false;
  
  return fns.every(fn => {
    // Verifica que sea una función
    if (typeof fn !== 'function') return false;
    
    // Obtiene la definición de la función como cadena de texto
    const functionString = Function.prototype.toString.call(fn); // Usar Function.prototype.toString para evitar errores con funciones nativas

    if (native) {
      // Verifica que no sea una función nativa
      if (/^\s*function\s*\w*\s*\([^)]*\)\s*{\s*\[native code\]\s*}\s*$/.test(functionString)) return false;

      // Verifica que la longitud de la función sea significativa
      const strippedFunction = functionString.replace(/\s/g, '');
      if (strippedFunction.length <= 15) return false; // Ajusta el umbral para la longitud mínima
    } else {
      // Si se permite la función nativa, verifica si está "vacía"
      const strippedFunction = functionString.replace(/\s/g, '');
      if (strippedFunction.length <= 15) return false; // Verifica si la longitud de la función es muy pequeña
    }

    return true;
  });
};









export {
  whoIsBad,
  isAnyBad,
  isBad,
  excludeProperty,
  isFunction
};
