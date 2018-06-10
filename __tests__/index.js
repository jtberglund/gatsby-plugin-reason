import { getComponentDefinitionLine, getNameFromReasonComponent } from '../src/utils';

describe('gatsby-plugin-reason', () => {
    describe('Paths', () => {
        const fileContents = `
            let component = ReasonReact.reducerComponent("MyComponent");

            let my_var = "stuff";

            let x = 1 + 2;
        `;

        test('Finds the line in the component file that contains the name', () => {
            const actual = getComponentDefinitionLine(fileContents);
            const expected = 'let component = ReasonReact.reducerComponent("MyComponent");';
            expect(actual).toEqual(expect.stringContaining(expected));
        });

        test('Parses the name from the name of the ReasonReact component', () => {
            const line = getComponentDefinitionLine(fileContents);
            const actual = getNameFromReasonComponent(line);
            const expected = 'MyComponent';
            expect(actual).toEqual(expected);
        });
    });
});
