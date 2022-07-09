import {EditorView, basicSetup} from "codemirror"
import {tag} from "@lezer/highlight"
import {HighlightStyle} from "@codemirror/language"

import {pasp} from "./lang-pasp/dist/index.js"

const editorConfig = EditorView.theme({
  "&": {height: "300px"},
  ".cm-scroller": {overflow: "auto"},
  ".cm-editor": {border: 2px solid black},
  ".cm-editor.cm-focused": {border: 2px solid black}
})

let editor = new EditorView({
  extensions: [editorConfig, basicSetup, pasp()],
  parent: document.body
})
