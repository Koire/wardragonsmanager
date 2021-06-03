import { text } from "hyperapp"
import { registerWD } from "./fx/api"
import { button, div, input, label } from "./htmlTags"

const setWDID = (state, { target: { value } }) => ({
    ...state,
    WDID: value,
})
const setUserName = (state, {playerName, teamName}) => ({
    ...state,
    playerName,
    teamName
})

const submitID = (state) => [
    state,
    [
        dispatch =>
            fetch(registerWD.path, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ apiKey: state.WDID }),
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                return res
            })
            .then(res => dispatch(setUserName, res))
            .catch(console.error),
            
    ],
]

export const LoginWithWD = (state) => {
    return div([
        div([
            text("UserName"),
            state.playerName && text(state.playerName),
            state.teamName && text(state.teamName)
        ]),
        label([
            text("WD ID"),
            input({
                oninput: setWDID,
                value: state.WDID,
            }),
        ]),
        button(
            {
                onclick: submitID,
            },
            text("Submit")
        ),
    ])
}
