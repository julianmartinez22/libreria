

export class Validate {

    // Validar correo electrónico (utilizando una expresión regular)
    validateEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailRegex.test(email);
    }
  
    // Validar que un campo no esté vacío
    validateRequired(fieldValue) {
      return fieldValue.trim() !== '';
    }
  
    // Validar que el número de páginas sea un número mayor a 0
    validatePages(pages) {
      return !isNaN(pages) && pages > 0;
    }
  
    // Validar que la URL de la imagen sea válida
    validateURL(url) {
      const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+(?:\.[a-zA-Z]{2,})+)(\/[a-zA-Z0-9-._~:?#&%=]+)*(\.[a-zA-Z]{2,})?$/;
      return urlRegex.test(url);
    }
  
    // Validar longitud de la descripción (opcional, pero no más de 500 caracteres)
    validateDescription(description) {
      return description.length <= 500;
    }
  }
  