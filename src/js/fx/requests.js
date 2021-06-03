import { BaseURL } from "../../constants"
import { Http } from "./http"

//Name the actions so default will show in Redux DevTools
const defaultHttpSuccess = (state, response) => ({ ...state, ...response })
const hideModalAction = (state) => ({ ...state, showProgressModal: false })
const defaultHttpError = (state, response) => ({
    ...state,
    showProgressModal: false,
    error: {
        message: decodeURIComponent(escape(response.statusText)),
        code: response.status,
    },
})
const defaultProps = {
    options: {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
        method: "GET",
    },
    error: defaultHttpError,
    action: defaultHttpSuccess,
}

export const requestApi = (endpoint, opts = {}) => {
    return Http({
        ...opts,
        url: `${BaseURL}/${endpoint.path}`,
        options: {
            ...defaultProps.options,
            method: endpoint.method || "GET",
            ...opts.options,
            ...(endpoint.method === "POST" && {
                body: JSON.stringify(opts.options.body),
            }),
        },
        action: opts.action || defaultProps.action,
        error: opts.error || defaultProps.error,
    })
}
