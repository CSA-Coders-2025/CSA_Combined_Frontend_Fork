---
layout: post
title: CodeMirror w/Python 
permalink: /code
---

<!-- CodeMirror CSS from CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/darcula.min.css">

<!-- CodeMirror JS from CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/python/python.min.js"></script>

<select onchange="selectLanguage(this)">
  <option value="python">Python</option>
  <option value="javascript">Javascript</option>
  <option value="html">HTML</option>
</select>

<textarea id="editor">print('Hello, world!')</textarea>
<button id="runBtn">Run Code</button>
<pre id="output"></pre>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
      lineNumbers: true,
      mode: "python",
      theme: "darcula"
    });

    document.getElementById("runBtn").onclick = function() {
      const code = editor.getValue();
      const outputDiv = document.getElementById("output");
      outputDiv.textContent = "⏳ Running...";
      fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "python",
          version: "3.10.0",
          files: [{ name: "main.py", content: code }]
        })
      })
      .then(resp => resp.json())
      .then(result => {
        if (result.run && result.run.output) outputDiv.textContent = result.run.output;
        else if (result.run && result.run.stdout) outputDiv.textContent = result.run.stdout;
        else outputDiv.textContent = "[no output]";
      })
      .catch(e => {
        outputDiv.textContent = "⚠️ " + e;
      });
    };

    function selectLanguage(x) {
      editor.setOption(x);
    }
  });
</script>