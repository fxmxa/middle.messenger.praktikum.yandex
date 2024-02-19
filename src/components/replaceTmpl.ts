import field from "@/components/field/field.ts";
import avatarUpload from "@/components/fileUpload/avatarUpload.ts";
import contact from "@/components/contact/contact.ts";

const components: Record<string, string> = {
  'field': field,
  'avatarUpload': avatarUpload,
  'contact': contact,
}

export default  (tmpl: string, componentsList: string[]) => {
  let newHtml = tmpl

  componentsList.map( async(componentName) => {
    const componentHtml = components?.[componentName]

    if(!componentHtml)
      return

    const openTagRe = new RegExp( `<${componentName}.+>`, 'gm')
    let match: RegExpMatchArray | null = null

    while (( match = openTagRe.exec(tmpl)) !== null) {
      const find = match[0]
      const props = find.split(' ').slice(1)
      newHtml = newHtml.replace(find, componentHtml)

      props.forEach( el => {
        const [key, rawValue] = el.split('=')
        const valRegExp = /".+"/

        const value = rawValue?.match(valRegExp)?.[0].slice(1, -1).replaceAll('_', ' ')

        if(value)
          newHtml = newHtml.replaceAll(`{{${key}}}`, value)
      })

    }
  })
  newHtml = newHtml.replaceAll(/{{.+}}/gm, '')

  return newHtml
}
