function convertHtml2JsonAndSet() {
    const htmlTextAreaValue = document.getElementById('html').value
    const jsonObj = html2json(htmlTextAreaValue)
    const jsonArea = document.getElementById('json')
    jsonArea.textContent = JSON.stringify(jsonObj, null, 2)
}

const voidTags = new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
])

const attrRegex = /([^\s=]+)\s*=\s*"([^"]*)"|([^\s=]+)\s*=\s*'([^']*)'/g

function createElementNode(tagName, attributes = {}) {
    return {
        type: 'element',
        tag: tagName,
        attributes,
        children: []
    }
}

function createTextNode(content) {
    return {
        type: 'text',
        content
    }
}

function createCommentNode(content) {
    return {
        type: 'comment',
        content
    }
}

function createDoctypeNode(value) {
    return {
        type: 'doctype',
        value
    }
}

function appendNode(stack, node, roots) {
    if (stack.length > 0) {
        stack[stack.length - 1].children.push(node)
    } else {
        roots.push(node)
    }
}

function html2json(htmlText) {
    const stack = []
    const roots = []

    function parseAttributes(tagString) {
        const attributes = {}

        let match

        while ((match = attrRegex.exec(tagString)) !== null) {
            const key = match[1] || match[3]
            const value = match[2] || match[4]
            attributes[key] = value
        }

        return attributes
    }

    let i = 0

    while (i < htmlText.length) {
        if (htmlText[i] === '<') {
            if (htmlText.substring(i, i + 4) === '<!--') {
                const closeIndex = htmlText.indexOf('-->', i + 4)
                const commentContent =
                    closeIndex !== -1
                        ? htmlText.substring(i + 4, closeIndex)
                        : htmlText.substring(i + 4)

                appendNode(stack, createCommentNode(commentContent.trim()), roots)

                i = closeIndex !== -1 ? closeIndex + 3 : htmlText.length
                continue
            }

            const start = i
            let j = i + 1

            while (j < htmlText.length && htmlText[j] !== '>') {
                j++
            }

            if (j >= htmlText.length) {
                break
            }

            const tagContent = htmlText.substring(start + 1, j).trim()

            if (tagContent.toUpperCase().startsWith('!DOCTYPE')) {
                const doctypeValue = tagContent.substring(8).trim()

                appendNode(stack, createDoctypeNode(doctypeValue), roots)

                i = j + 1

                continue
            }

            if (tagContent[0] === '/') {
                if (stack.length > 0) {
                    stack.pop()
                }

                i = j + 1

                continue
            }

            const isSelfClosing = tagContent.endsWith('/')

            const cleanTag = isSelfClosing ? tagContent.slice(0, -1).trim() : tagContent

            const firstSpaceIndex = cleanTag.indexOf(' ')

            const tagName =
                firstSpaceIndex === -1 ? cleanTag : cleanTag.substring(0, firstSpaceIndex)

            const attributesString =
                firstSpaceIndex === -1 ? '' : cleanTag.substring(firstSpaceIndex + 1)

            const attributes = parseAttributes(attributesString)

            const element = createElementNode(tagName, attributes)

            if (tagName.toLowerCase() === 'script' || tagName.toLowerCase() === 'style') {
                const closingTag = `</${tagName}>`

                const closeIndex = htmlText.indexOf(closingTag, j + 1)

                const rawContent = closeIndex !== -1 ? htmlText.substring(j + 1, closeIndex) : ''

                if (rawContent.trim()) {
                    element.children.push(createTextNode(rawContent))
                }

                appendNode(stack, element, roots)

                i = closeIndex !== -1 ? closeIndex + closingTag.length : j + 1

                continue
            }

            appendNode(stack, element, roots)

            const isVoidTag = voidTags.has(tagName.toLowerCase())

            if (!isSelfClosing && !isVoidTag) {
                stack.push(element)
            }

            i = j + 1
        } else {
            const start = i

            while (i < htmlText.length && htmlText[i] !== '<') {
                i++
            }

            const textContent = htmlText.substring(start, i).trim()

            if (textContent) {
                appendNode(stack, createTextNode(textContent), roots)
            }
        }
    }

    return roots.length === 1 ? roots[0] : roots
}

function showExample1() {
    const htmlExample = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport">
    <title>Sample HTML</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
    <main>
        <section id="home">
            <h2>Home Section</h2>
            <p>This is the home section of the webpage.</p>
        </section>
        <section id="about">
            <h2>About Section</h2>
            <p>This is the about section of the webpage.</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 My Website</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
`
    const jsonContent = {
        'Comment 1':
            'You have to think about how to take into account various html inputs so your json structure will cover them all and handle different cases.',
        'Comment 2':
            'When you make any choice in terms of selecting specific json structure for conversion - be ready to provide reasoning behind such choice.'
    }

    document.getElementById('html').value = htmlExample
    document.getElementById('json').textContent = JSON.stringify(jsonContent, null, 2)
}

function showExample2() {
    const htmlExample = `<div>
<p>Hello world!</p>
  <button>Click me!</button>
  <textarea>Some very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long string.</textarea>
</div>
`
    const jsonContent = {
        'Comment 1':
            'You have to think about how to take into account various html inputs so your json structure will cover them all and handle different cases.',
        'Comment 2':
            'When you make any choice in terms of selecting specific json structure for conversion - be ready to provide reasoning behind such choice.'
    }

    document.getElementById('html').value = htmlExample
    document.getElementById('json').textContent = JSON.stringify(jsonContent, null, 2)
}
