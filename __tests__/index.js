import fs from 'fs'
import path from 'path'

import { getLineWithComponentName, extractNameFromLine } from '../src/utils'

const context = describe

const readFixture = filename => {
    const fixturePath = path.join(__dirname, 'fixtures', filename)
    return fs.readFileSync(fixturePath, 'utf-8')
}

context('Find the line in the component file that contains the name', () => {
    const findLineIn = fixtureName =>
        getLineWithComponentName(readFixture(fixtureName))

    test('Simple file with reducer component', () => {
        const line = findLineIn('reducerComponent')
        expect(line).toEqual(
            'let component = ReasonReact.reducerComponent("MyComponent");'
        )
    })

    test('File with module', () => {
        const line = findLineIn('reducerComponentWithModule')
        expect(line).toEqual(
            'let component = ReasonReact.reducerComponent("MyComponent");'
        )
    })
})

context('Extract the page name from line with code', () => {
    it('works', () => {
        const fileContents = readFixture('reducerComponent')
        const line = getLineWithComponentName(fileContents)
        const name = extractNameFromLine(line)

        expect(name).toEqual('MyComponent')
    })
})
