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

    test('File with functional component', () => {
        const line = findLineIn('functionalComponent')
        expect(line).toEqual(
            'React.setDisplayName(make, "FunctionalComponentName");'
        )
    })
})

context('Extract the page name from line with code', () => {
    context('Old record-style components', () => {
        const components = [
            'statelessComponent',
            'statelessComponentWithRetainedProps',
            'reducerComponent',
            'reducerComponentWithRetainedProps',
        ]

        components.forEach(c => {
            const line = `let component = ReasonReact.${c}("MyComponent");`

            it(`extracts name from ${c}`, () => {
                const name = extractNameFromLine(line)
                expect(name).toEqual('MyComponent')
            })
        })
    })

    it(`extracts name from line with name for functional component`, () => {
        const line = 'React.setDisplayName(make, "FunctionalComponentName");'
        const name = extractNameFromLine(line)
        expect(name).toEqual('FunctionalComponentName')
    })
})
