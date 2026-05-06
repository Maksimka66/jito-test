const sampleBasicNested = `<div>
    <p>Hello world!</p>
    <button>Click me!</button>
</div>`

const sampleAttributes = `<section id="main" class="wrapper content" data-role='container'>
    <h1 title="Main title">Welcome</h1>
</section>`

const sampleVoidTags = `<div>
    <img src="photo.jpg" alt="My image" />
    <br>
    <meta charset="UTF-8">
    <input type="text" value="hello">
</div>`

const sampleDoctypeFullDocument = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <h1>Page title</h1>
</body>
</html>`

const sampleComments = `<div>
    <!-- this is comment -->
    <p>Hello</p>
    <!-- second comment -->
</div>`

const sampleScriptAndStyle = `<html>
<head>
    <style>
        body { color: red; }
        .box > p { font-size: 16px; }
    </style>
</head>
<body>
    <script>
        if (a < b) {
            console.log("works");
        }
    </script>
</body>
</html>`

const sampleMultipleRoots = `<div>First root</div>
<section>Second root</section>
<footer>Third root</footer>`

const sampleMalformedMissingClosing = `<div>
    <p>Hello
    <span>World</span>
</div>`

const sampleLongText = `<textarea>Some very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long string.</textarea>`

const sampleDeepNesting = `<div>
    <section>
        <article>
            <header>
                <h2>
                    <span>
                        Deep content
                    </span>
                </h2>
            </header>
        </article>
    </section>

</div>`

const sampleMixedEverything = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        .title { color: blue; }
    </style>
</head>
<body>
    <!-- page header -->
    <header class="main-header">
        <h1>Hello Parser</h1>
        <img src="logo.png" alt="Logo">
    </header>

    <main>
        <section id="content">
            <p>This is <strong>mixed</strong> content.</p>
            <input type="text" value="sample" />
        </section>
    </main>

    <script>
        if (x < y) {
            console.log("mixed sample");
        }
    </script>
</body>
</html>`

