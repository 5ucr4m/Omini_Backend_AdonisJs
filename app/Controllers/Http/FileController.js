'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
  async show ({ params, response }) {
    const file = await File.query()
      .where('file', params.id)
      .first()

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async store ({ request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file')

      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('Uploads'), {
        name: fileName
      })

      if (!upload.moved()) {
        throw upload.error()
      }
      console.log(fileName, upload.subtype)

      const file = await File.create({
        file: fileName,
        original_name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (err) {
      return response.status(500).send({
        error: {
          message: 'Erro no upload de arquivo'
        }
      })
    }
  }
}

module.exports = FileController
