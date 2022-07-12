import {EditorView, basicSetup} from "codemirror"
import {HighlightStyle} from "@codemirror/language"

import {pasp} from "./lang-pasp/dist/index.js"

const editorConfig = EditorView.theme({
  ".cm-scroller": {overflow: "auto"},
})

let editor = new EditorView({
  extensions: [editorConfig, basicSetup, pasp()],
  doc: "0.5::a.",
  parent: document.getElementById("editor"),
})

var examplesInput = document.getElementById("examples");

examplesInput.addEventListener("change", function(e) {
  var file = examplesInput.value
  var req = new XMLHttpRequest();

  req.open("GET", "./examples/" + file.toLowerCase() + ".lp", false);
  req.send();

  if (req.status == 200) {
    var data = req.responseText;
    editor.dispatch({changes: [
      {from: 0, to: editor.state.doc.length},
      {from: 0, insert: data}
    ]});
  }
});
