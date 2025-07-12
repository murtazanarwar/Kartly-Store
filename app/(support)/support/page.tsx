import InputBox from "./components/chat-input";
import MessageList from "./components/message-list";

const Support = () => {
    return (
        <div className="flex flex-col items-center justify-between h-[calc(100vh-16.5rem)] w-full">
            <MessageList/>
            <InputBox />
        </div>
    )
}

export default Support;