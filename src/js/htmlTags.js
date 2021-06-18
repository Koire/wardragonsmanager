import { h } from "hyperapp"
export const [div, label, h1, main, table, thead, tbody, th, td, tr] = [
    "div",
    "label",
    "h1",
    "main",
    "table",
    "thead",
    "tbody",
    "th",
    "td",
    "tr",
].map((tag) => (children) => h(tag, {}, children))
export const [input, button, select, option] = ["input", "button", "select", "option"].map(
    (tag) =>
        (options = {}, children = []) =>
            h(tag, options, children)
)
