import { App } from 'vue'
import xss from 'xss'

export default (app:App<Element>):void => {
  app.directive('xss-html', {
    beforeMount(el, binding) {
      const { value } = binding
      el.innerHTML = xss(value, {
        onIgnoreTagAttr: function(tag, name, value) {
          if (['class','style'].indexOf(name) > -1) {
            return `${name}="${value}"`
          }
        }
      })
    },
    beforeUpdate(el,binding) {
      if(binding.oldValue != binding.value) {
        const { value } = binding
        el.innerHTML = xss(value, {
          onIgnoreTagAttr: function(tag, name, value) {
            if (['class','style'].indexOf(name) > -1) {
              return `${name}="${value}"`
            }
          }
        })
      }
    }


  })
}