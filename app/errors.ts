import SuperJson from "superjson"

export class NameAlreadyTakenError extends Error {
    name = "NameAlreadyTakenError"
    statusCode = 422
    constructor(message = "Name already taken") {
        super(message)
    }
    get _clearStack() {
        return true
    }
}

export default function registerErrors() {
    SuperJson.registerClass(NameAlreadyTakenError, {
        identifier: "NameAlreadyTakenError",
        allowProps: ["message"],
    })
}
