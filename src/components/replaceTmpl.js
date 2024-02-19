import field from "@/components/field/field.js";
import avatarUpload from "@/components/fileUpload/avatarUpload.js";
import contact from "@/components/contact/contact.js";

const components = {
  'field': field,
  'avatarUpload': avatarUpload,
  'contact': contact,
}

export default  (tmpl, componentsList) => {
  let newHtml = tmpl

  componentsList.map( async(componentName) => {
    const componentHtml = components?.[componentName]

    if(!componentHtml)
      return

    const openTagRe = new RegExp( `<${componentName}.+>`, 'gm')
    let match = []

    while (( match = openTagRe.exec(tmpl)) !== null) {
      const find = match[0]
      const props = find.split(' ').slice(1)
      newHtml = newHtml.replace(find, componentHtml)

      props.forEach( el => {
        const [key, rawValue] = el.split('=')
        const valRegExp = /".+"/
        const value = rawValue?.match(valRegExp)[0].slice(1, -1).replaceAll('_', ' ')

        if(value)
          newHtml = newHtml.replaceAll(`{{${key}}}`, value)
      })

    }
  })
  newHtml = newHtml.replaceAll(/{{.+}}/gm, '')

  return newHtml
}
