import React from 'react';
import './App.css';
import {dateToStr} from "./utils";
import sendIcon from "./images/send-icon.png";

const server = "localhost:8000";
//const server = "10.122.27.70:8000";

class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.connection = new WebSocket('ws://' + server);

        this.connection.onopen = (message) => {
            // this.connection is opened and ready to use
            this.connection.send(JSON.stringify({message: "init-chatbot"}))

        };

        this.connection.onerror = function (error) {
            // an error occurred when sending/receiving data
        };
    }

    render() {
        return (
            <div className="page center">
                <div className="container"
                     style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <div className="cell" style={{overflow: "auto"}} id="chat-container">
                        <ChatContainer connection={this.connection}/>
                    </div>
                    <TextField connection={this.connection}/>
                </div>
            </div>
        )
    }
}

class ChatContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            messages: []
        }
    }


    componentWillMount() {
        const {connection} = this.props;
        connection.onmessage = (message) => {
            // try to decode json (I assume that each message
            // from server is json)
            //console.log("chat container cwm", message)
            let json;
            try {
                json = JSON.parse(message.data);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ', message.data);
                return;
            }
            console.log("json", json);
            if (json && !!json.suggest)
                return;
            //console.log("json", json);
            this.setState({
                messages: [...this.state.messages, ...json]
            }, () => {
                const container = document.getElementById("chat-container");
                container.scrollTo(0, container.scrollHeight);

                // setTimeout(() => {
                //     container.scrollTo(0, container.scrollHeight)
                // }, 300);
                // setTimeout(() => {
                //     container.scrollTo(0, container.scrollHeight)
                // }, 800);
            })
            // handle incoming message
        };
    }

    render() {
        const {connection} = this.props;
        return (
            <div style={{width: "100%", height: "100%"}}>
                <ChatContent messages={this.state.messages} connection={connection}/>
            </div>
        );
    }

}

const ChatContent = (props) => {
    const {messages, connection} = props;
    //console.log("messages", messages);
    return messages.map((item, index) => {
        const {message, list, options} = item;
        return [
            message ? <ChatItem key={index + "c"} message={item}/> : null,
            (list || []).length ? <List key={index + "l"} message={item} connection={connection}/> : null,
            (options || []).length ? <Options key={index + "o"} options={options} connection={connection}/> : null
        ].filter(i => i)
    })
};

const Options = (props) => {
    const {options, connection} = props;
    return (
        <div className="spread">
            {options.map((option, index) => {
                return (
                    <Option key={index} option={option} onClick={() => {
                        connection.send(JSON.stringify({
                            author: "user",
                            message: option,
                            date: new Date()
                        }))
                    }}/>
                )
            })
            }
        </div>
    )
};

const Option = (props) => {
    const {option, onClick} = props;
    return (
        <div className="big-cell option-item" onClick={onClick}>
            {option}
        </div>
    )
};

const List = (props) => {
    const {message: {list}, connection} = props;
    return (
        <div className="list center">
            <div className="cell" style={{width: '100%'}}>
                <ul style={{listStyle: "none", margin: 0, padding: 0, width: "100%"}}>
                    {list.map((listItem, index) => {
                        return <li key={index} className="cell list-item"
                                   onClick={() => connection.send(JSON.stringify({
                                       author: "user",
                                       message: listItem,
                                       date: new Date()
                                   }))}>{listItem}</li>
                    })}
                </ul>
            </div>
        </div>
    )
};

const ChatItem = (props) => {
    const {message: {author, message, date}} = props;
    const className = author === "chatbot" ? "chatbot-chat-item" : "user-chat-item";
    const justifyContent = author === "chatbot" ? "flex-start" : "flex-end";
    return (
        <div style={{display: "flex", justifyContent}}>
            <div className={"cell " + className}>
                <p>{message}</p>
                <DateText date={date}/>
            </div>
        </div>
    )
}

const DateText = props => {
    const {date} = props;
    return (
        <span className="date-text">{dateToStr(date)}</span>
    )
}

class TextField extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            message: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSend = this.onSend.bind(this);
    }

    onSend() {

        const {connection} = this.props;
        const {message} = this.state;
        if (!message) return;
        const request = {
            author: "user",
            message,
            date: new Date()
        };
        connection.send(JSON.stringify(request));
        this.setState({message: ""});

    }

    onChange(value) {
        const message = value;
        const {connection} = this.props;
        const request = {
            author: "user",
            message,
            suggest: true,
            date: new Date()
        };
        connection.send(JSON.stringify(request));
        this.setState({message})
    }

    render() {
        return (
            <div className={'center'} style={{position: "relative"}}>
                <input type="text"
                       id={"text-field"}
                       onChange={e => this.onChange(e.target.value)}
                       value={this.state.message}
                       className="full-width text-field"
                       onKeyPress={e => e.key === "Enter" ? this.onSend() : null}
                />
                <Suggestions connection={this.props.connection}
                             message={this.state.messages}
                             onChange={this.onChange}
                />
                <SendButton disabled={!this.state.message} onSend={this.onSend}/>
            </div>
        )
    }
}

const SendButton = props => {
    const {onSend, disabled} = props;
    const className = disabled ? "send-button-disabled" : "send-button";
    return (
        <div style={{margin: 8}}>
            <div className={"center " + className}
                 onClick={onSend}>
                <img src={sendIcon} alt="Send" width="20" height="20"/>
            </div>
        </div>
    )
}

class Suggestions extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {suggestions: []}
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(suggest) {
        const {onChange} = this.props
        const textField = document.getElementById("text-field");
        const value = textField.value;
        console.log("value", value);
        if (suggest.indexOf(value) === 0) {
            onChange(suggest + " ");
        } else {
            let splittedValue = value.split(" ")
            splittedValue = splittedValue.slice(0, splittedValue.length - 1);
            onChange(splittedValue.join(" ") + " " + suggest + " ");
        }
        textField.focus()

    }


    componentWillMount() {
        const {connection} = this.props;
        const old = connection.onmessage
        connection.onmessage = (message) => {
            //console.log("if", message)

            let json;
            try {
                json = JSON.parse(message.data);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ', message.data);
                return;
            }

            if (json && json.suggest) {
                this.setState({suggestions: json.message})
            } else {
                //console.log("else", message)
                old(message)
            }
        }
    }


    render() {
        return (
            <div style={{position: "absolute", left: 8, bottom: 64, backgroundColor: "#eee"}}>
                {(this.state.suggestions || []).map((suggest, index) => {
                    if (index < 5) {
                        return (
                            <div key={index}
                                 className="cell clickable"
                                 tabIndex={0}
                                 onClick={() => this.onSelect(suggest)}
                                 onKeyPress={e => e.key === "Enter" && this.onSelect(suggest)}
                            >
                                {suggest}
                            </div>
                        )
                    } else {
                        return null
                    }
                })}
            </div>
        );
    }

}

export default App;
