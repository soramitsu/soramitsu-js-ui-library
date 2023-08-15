import { Icons16, Icons24, StatusIcons } from './consts'

export const iconClass = (name: string): string => {
  if (!name) {
    return ''
  }
  if (name.startsWith('el-icon')) {
    return name
  }
  const is16Size = (Object.values(Icons16) as Array<string>).includes(name)
  const is24Size = (Object.values(Icons24) as Array<string>).includes(name)
  const isStatusIcon = (Object.values(StatusIcons) as Array<string>).includes(name)
  if (!(is16Size || is24Size || isStatusIcon)) {
    console.warn(`'${name}' was not found`)
    return ''
  }
  return `s-icon-${name}`
}
