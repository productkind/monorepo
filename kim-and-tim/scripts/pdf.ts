import { PDFDocument } from 'pdf-lib'

export const createCarouselPdf = async ({ pngs }: { pngs: Uint8Array[] }) => {
  const pdf = await PDFDocument.create()
  for (const png of pngs) {
    const image = await pdf.embedPng(png)
    const page = pdf.addPage([image.width, image.height])
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height })
  }
  return pdf.save()
}
