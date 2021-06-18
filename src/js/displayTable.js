import { h, text } from "hyperapp";
import { thead, th, tbody, td, tr, table, button } from "./htmlTags.js";
import { removeTZ, removeCG, changeTz, addTz } from "./actions.js";
import { timezoneHolder } from "./timezoneHolder.js";

export const DisplayTable = ({ chosenTZ, guardSwaps }) =>
  table([
    thead(
      tr([
        th(text("UTC")),
        th(text("Amount")),
        th(text("Level")),
        ...chosenTZ.map((element, idx) =>
          th(timezoneHolder({onchange: changeTz(idx)}, element))
        ),
        th(button({onclick: addTz}, text("+")))
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
