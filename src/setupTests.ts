import '@testing-library/jest-dom'
import 'config/i18n'

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() { return undefined },
      removeListener: function() { return undefined }
    }
  }
