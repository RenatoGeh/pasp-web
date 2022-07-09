import {parser} from "./pasp.js"
import {foldNodeProp, foldInside, indentNodeProp, LRLanguage, LanguageSupport} from "@codemirror/language"
import {completeFromList} from "@codemirror/autocomplete"
import {styleTags, tags as t} from "@lezer/highlight"

let parserWithMetadata = parser.configure({
  props: [
    styleTags({
      Comment: t.lineComment,
      Const: t.string,
      Var: t.variableName,
      Id: t.integer,
      Prob: t.float,
      Neg: t.logicOperator,
      Op: t.arithmeticOperator,
      Gratom: t.typeName,
      Grpred: t.macroName,
      Atom: t.typeName,
      Pred: t.macroName,
      Query: t.keyword,
      "( )": t.paren,
      "[ ]": t.squareBracket,
    }),
    indentNodeProp.add({
      Application: context => context.column(context.node.from) + context.unit
    }),
    foldNodeProp.add({
      Application: foldInside
    })
  ]
})

export const paspLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    commentTokens: {line: ";"}
  }
})

export const paspCompletion = paspLanguage.data.of({
  autocomplete: completeFromList([
    {label: "#query", type: "keyword"},
    {label: "not", type: "keyword"},
  ])
})

export function pasp() {
  return new LanguageSupport(paspLanguage, [paspCompletion])
}
