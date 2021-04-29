/**
 * Resets file upload
 * @param {Event} event 
 */
export const nullifyEventValue = event => {
  event.target.value = null
}

/**
 * Gets extension of files
 * @param {string} file 
 */
export const ext = file => file.split('.').pop()

/**
 * Replaces variables enclosed in double curly braces with values in data
 * @param {string} raw 
 * @param {object} data 
 */
export const repl = (raw, data) => raw.replace(
  /{{(.+?)}}/g,
  (_, substr) => data[substr] || substr
)