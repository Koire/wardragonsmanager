import { text } from "hyperapp"
import { select, option } from "./htmlTags"
import { timezones } from "./timezones.js"

export const timezoneHolder = (options, selectedTz) => {
    return select(
        options,
        timezones.map((element) =>
            option(
                { ...(element == selectedTz && { selected: true }) },
                text(element)
            )
        )
    )
}
