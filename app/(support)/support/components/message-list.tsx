import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/chat/chat-bubble";
import { ChatMessageList } from "@/components/chat/chat-message-list";

const MessageList = () => {
    return ( 
        <div className="w-full pb-4 overflow-hidden scrollbar-hide">
            <ChatMessageList>
            <ChatBubble variant='sent'>
                <ChatBubbleAvatar fallback='US' />
                <ChatBubbleMessage variant='sent'>
                    Hello, how has your day been? I hope you are doing well.
                </ChatBubbleMessage>
            </ChatBubble>

            <ChatBubble variant='received'>
                <ChatBubbleAvatar fallback='AI' />
                <ChatBubbleMessage variant='received'>
                    Hi, I am doing well, thank you for asking. How can I help you today?
                </ChatBubbleMessage>
            </ChatBubble>
            <ChatBubble variant='received'>
                <ChatBubbleAvatar fallback='AI' />
                <ChatBubbleMessage variant='received'>
                    Hi, I am doing well, thank you for asking. How can I help you today?
                </ChatBubbleMessage>
            </ChatBubble>
            <ChatBubble variant='received'>
                <ChatBubbleAvatar fallback='AI' />
                <ChatBubbleMessage variant='received'>
                    Hi, I am doing well, thank you for asking. How can I help you today?
                </ChatBubbleMessage>
            </ChatBubble>
            <ChatBubble variant='received'>
                <ChatBubbleAvatar fallback='AI' />
                <ChatBubbleMessage variant='received'>
                    Hi, I am doing well, thank you for asking. How can I help you today?
                </ChatBubbleMessage>
            </ChatBubble>
            <ChatBubble variant='received'>
                <ChatBubbleAvatar fallback='AI' />
                <ChatBubbleMessage variant='received'>
                    Hi, I am doing well, thank you for asking. How can I help you today?
                </ChatBubbleMessage>
            </ChatBubble>
            <ChatBubble variant='received'>
                <ChatBubbleAvatar fallback='AI' />
                <ChatBubbleMessage variant='received'>
                    Hi, I am doing well, thank you for asking. How can I help you today?
                </ChatBubbleMessage>
            </ChatBubble>
            <ChatBubble variant='received'>
                <ChatBubbleAvatar fallback='AI' />
                <ChatBubbleMessage variant='received'>
                    Hi, I am doing well, thank you for asking. How can I help you today?
                </ChatBubbleMessage>
            </ChatBubble>
            <ChatBubble variant='received'>
                <ChatBubbleAvatar fallback='AI' />
                <ChatBubbleMessage variant='received'>
                    Hi, I am doing well, thank you for asking. How can I help you today?
                </ChatBubbleMessage>
            </ChatBubble>

            <ChatBubble variant='received'>
                <ChatBubbleAvatar fallback='AI' />
                <ChatBubbleMessage isLoading />
            </ChatBubble>
            </ChatMessageList>
        </div>
     );
}
 
export default MessageList;