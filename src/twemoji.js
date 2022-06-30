import twemoji from "twemoji";

export const twiemoji = function (node, params) {
    twemoji.parse(node);
    return {
        update(params) {
            twemoji.parse(node);
        },
        destroy() {

        },
    };
}