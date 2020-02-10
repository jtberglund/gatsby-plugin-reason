import fs from 'fs'
import path from 'path'

import { getLineWithComponentName, extractNameFromLine } from '../src/utils'

const fixturePath = filename => path.join(__dirname, 'fixtures', filename)

const readFixture = filename => fs.readFileSync(fixturePath(filename), 'utf-8')

describe('gatsby-plugin-reason', () => {
    describe('Paths', () => {
        const fileContents = readFixture('reducerComponent')

        test('Finds the line in the component file that contains the name', () => {
            const line = getLineWithComponentName(fileContents)
            const expected =
                'let component = ReasonReact.reducerComponent("MyComponent");'

            expect(line).toEqual(expected)
        })

        test('Parses the name from the name of the ReasonReact component', () => {
            const line = getLineWithComponentName(fileContents)
            const name = extractNameFromLine(line)

            expect(name).toEqual('MyComponent')
        })
    })
})
