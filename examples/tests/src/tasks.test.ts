import {describe, expect, it} from 'vitest'
import path from "path"
import * as fs from "node:fs"
import * as mupdf from "mupdf"
import {drawPageAsHTML, drawPageAsPNG, drawPageAsSVG, getPageText, loadPDF, searchPageText} from "../tasks.ts"

const scriptdir = path.resolve(__dirname)
const filename = path.join(scriptdir, "..", "resources", "test.pdf")
const outputDir = path.join(scriptdir, "..", "resources")

const file = fs.readFileSync(filename)

describe("loadPDF", () => {
    it("successfully loads a PDF document", () => {
        const file = fs.readFileSync(filename)
        let document: null | mupdf.PDFDocument = null

        expect(() => {
            document = loadPDF(file)
        }).not.toThrow()

        expect(document).not.toBeNull()
    })
})

describe("drawPageAsPng", () => {
    it("successfully renders a page as PNG", () => {
        const result = drawPageAsPNG(loadPDF(file), 0, 150)
        expect(result).toHaveLength(173738)
        fs.writeFileSync(
          path.join(outputDir, "output-tasks.png"),
          Buffer.from(result)
        )
    })
})

describe("drawPageAsHtml", () => {
    it("successfully renders a page as HTML", () => {
        const result = drawPageAsHTML(loadPDF(file), 0, 0)
        expect(result).toHaveLength(710)
        fs.writeFileSync(
          path.join(outputDir, "output-tasks.html"),
          Buffer.from(result)
        )
    })
})

describe("drawPageAsSvg", () => {
    it("successfully renders a page as SVG", () => {
        const result = drawPageAsSVG(loadPDF(file), 0)
        expect(result).toHaveLength(91551)
        fs.writeFileSync(
          path.join(outputDir, "output-tasks.svg"),
          Buffer.from(result)
        )
    })
})

describe("getPageText", () => {
    it("successfully extracts the text from page", () => {
        const result = getPageText(loadPDF(file), 0)
        expect(result).toMatchInlineSnapshot(`
          "Welcome to the Node server test.pdf file.

          Sorry there is not much to see here!

          1

          Page 1 footer

          "
        `)
    })
})

describe("searchPageText", () => {
    it("returns an array of search results as coordinate bounding boxes", () => {
        const result = searchPageText(loadPDF(file), 0, "Welcome", 1)
        expect(result).toMatchInlineSnapshot(`
          [
            [
              [
                30.7637996673584,
                31.41798973083496,
                80.76780700683594,
                31.41798973083496,
                30.7637996673584,
                47.389991760253906,
                80.76780700683594,
                47.389991760253906,
              ],
            ],
          ]
        `)
    })

    it("returns an empty array if no matches found", () => {
        const result = searchPageText(loadPDF(file), 0, "mupdf", 1)
        expect(result).toMatchInlineSnapshot(`[]`)
    })
})
