// Gera os ícones em PNG e ICO a partir de public/favicon.svg.
// Rodar à mão depois de mudar o ícone: node scripts/build-favicons.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const inPublic = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url))
const svg = readFileSync(inPublic('favicon.svg'))
const png = (size) => sharp(svg, { density: 72 * Math.ceil(size / 32) * 2 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer()

writeFileSync(inPublic('favicon-192.png'), await png(192))

// O iOS preenche os cantos transparentes de preto: aqui o fundo é branco e cheio.
const opaque = await sharp(await png(180)).flatten({ background: '#FFFFFF' }).png({ compressionLevel: 9 }).toBuffer()
writeFileSync(inPublic('apple-touch-icon.png'), opaque)

// ICO com um único PNG de 48x48 dentro: cabeçalho de 6 bytes + entrada de 16 bytes.
const image = await png(48)
const header = Buffer.alloc(22)
header.writeUInt16LE(1, 2) // tipo: ícone
header.writeUInt16LE(1, 4) // uma imagem
header.writeUInt8(48, 6) // largura
header.writeUInt8(48, 7) // altura
header.writeUInt16LE(1, 10) // planos
header.writeUInt16LE(32, 12) // bits por pixel
header.writeUInt32LE(image.length, 14)
header.writeUInt32LE(22, 18) // onde a imagem começa
writeFileSync(inPublic('favicon.ico'), Buffer.concat([header, image]))

console.log('favicon-192.png, apple-touch-icon.png e favicon.ico gerados')
