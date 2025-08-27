import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import './App.css';
function App() {
    const [socket, setSocket] = useState(null);
    const inputRef = useRef(null);
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        setSocket(ws);
        ws.onmessage = (event) => {
            alert(event.data);
        };
    }, []);
    const sendMessage = () => {
        socket?.send(inputRef.current?.value || '');
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { children: [_jsx("input", { ref: inputRef, type: 'text', placeholder: 'message' }), _jsx("button", { onClick: sendMessage, children: "Send" })] }) }));
}
export default App;
//# sourceMappingURL=App.js.map