const Typing = () => {
    return (
        <div className="flex justify-start">
            <div className="m-2 chatbot-chat-item relative px-4 py-5 min-w-[50px]">
                <span className="dot-bounce text-5xl" style={{ animationDelay: "0", left: 10 }}>.</span>
                <span className="dot-bounce text-5xl" style={{ animationDelay: "0.2s", left: 20 }}>.</span>
                <span className="dot-bounce text-5xl" style={{ animationDelay: "0.4s", left: 30 }}>.</span>
            </div>
        </div>
    );
};


export default Typing;