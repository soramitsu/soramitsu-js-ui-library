import { Expect, Equal } from './types'
import { Opaque } from 'type-fest'

type Sample1 = `
  v-btn .loading .is-huge .size(sm md lg)
  head text spinner(.type(primary secondary))
`

type ParseSchema<schema extends string> = Tokenize<schema>

namespace Tokens {
  type Identifier<s extends string> = Opaque<s, 'id'>

  // type FindNextToken<s extends string> =
}

type Tokenize<schema extends string> = []

// type FindNextToken

declare function defineBem<schema extends string>(schema: schema): ParseSchema<schema>

const a = defineBem(`v-btn .accent`)
