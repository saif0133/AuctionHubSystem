import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
function Message() {
    const name = 'saif';
    if (name)
        return _jsxs("h1", { children: ["Hello ", name] });
    else
        return _jsx("h1", { children: "Hello World" });
}
export default Message;
