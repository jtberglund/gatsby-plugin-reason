// TODO can we parse the AST generated by refmt to more reliably get the component name?

/**
 * Find the line that contains the component definition
 */

export const getLineWithComponentName = fileSource =>
    fileSource
        .split('\n')
        .filter(Boolean)
        .find(
            l =>
                l.startsWith('let component') ||
                l.startsWith('React.setDisplayName')
        )

export const extractNameFromLine = line => line.split('"')[1]

/**
 * Given the source for a page component's file, parse the contents of the file
 * in order to determine the URL path for the page. This will use the name
 * of the ReasonReact component defined in the file.
 *
 * e.g. if the source contains
 * ```ocaml
 * let component = ReasonReact.statelessComponent("MyComponent");
 * ```
 * this will return `'MyComponent'`
 */
export const getPathForComponent = source => {
    const line = getLineWithComponentName(source)
    if (!line) {
        return
    }

    const name = extractNameFromLine(line)
    return name === 'index' ? '/' : `/${name}/`
}
