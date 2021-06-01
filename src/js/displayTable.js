import { h, text } from "hyperapp";
import { removeTZ, removeCG } from "./actions.js";

export const DisplayTable = ({ chosenTZ, guardSwaps }) =>
  h("table", {}, [
    h(
      "thead",
      {},
      h("tr", {}, [
        h("td", {}, text("UTC")),
        h("td", {}, text("Amount")),
        h("td", {}, text("Level")),
        ...chosenTZ.map((element, idx) =>
          h("th", { onclick: removeTZ(idx) }, text(element))
        ),
      ])
    ),
    h(
      "tbody",
      {},
      guardSwaps.map(({ date, amount, level }, idx) =>
        h("tr", { onclick: removeCG(idx) }, [
          h("td", {}, text(date.toISOString())),
          h("td", {}, text(amount + "M")),
          h("td", {}, text(level)),
          ...chosenTZ.map((tz) =>
            h(
              "td",
              {},
              text(
                new Date(date.toISOString()).toLocaleString("en-US", {
                  timeZone: tz,
                })
              )
            )
          ),
        ])
      )
    ),
  ]);
