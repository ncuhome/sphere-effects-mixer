import fs from 'fs'
import path from 'path'
import gltfjsx from 'gltfjsx/src/gltfjsx'

const ART_DIR = path.join(__dirname, '../art')

const MODELS_DIR = path.join(__dirname, '../src/models')

const main = async () => {
    const files = fs.readdirSync(ART_DIR)

    for (const file of files) {
        console.log(file)
        if (file.endsWith('.glb') || file.endsWith('.gltf')) {
            const { name } = path.parse(file)
            await gltfjsx(path.join(ART_DIR, file), path.join(MODELS_DIR, `${name}.tsx`), {
                types: true,
                transform: true
            })
            const outFileName = `${name}-transformed.glb`
            fs.renameSync(
                path.join(__dirname, `../${outFileName}`),
                path.join(__dirname, `../public/${outFileName}`)
            )
        }
    }
}

main()

