import React from 'react';
import './App.css';
import {dateToStr} from "./utils";
import sendIcon from "./images/send-icon.png";
import coffeeCup from "./images/coffee-cup.png";

const server = "coffeechatbot.cf/ws";

class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {init: false};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({init: true})
        }, 3000)
    }


    render() {
        return this.state.init ? <ChatBot/> : <Welcome/>
    }
}

const Welcome = () => {
    return (
        <div className="page center">
            <div className="container">
                <div className="welcome-container" style={{height: "100%"}}>
                    <div className="spread-column" style={{height: "100%"}}>
                        <div className="welcome-title">
                            Welcome to CoffeeInLove
                        </div>
                        <div className="welcome-dsc">
                            Have you taste our delicious coffees?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

class ChatBot extends React.Component {
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
            let json;
            try {
                json = JSON.parse(message.data);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ', message.data);
                return;
            }

            if (json && !!json.suggest)
                return;

            this.setState({
                messages: [...this.state.messages.filter(i => json.status === 'typing' || i.status !== 'typing'), json]
            }, () => {
                const container = document.getElementById("chat-container");
                container.scrollTo(0, container.scrollHeight);
            })
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
    return messages.map((item, index) => {
        const {name, message, list, options, status, coffees} = item;
        return [
            name ? <Coffees key={"n"} name={name} coffees={coffees}/> : null,
            status === 'typing' ? <Typing key={index + "t"} message={item}/> : null,
            !!message ? <ChatItem key={index + "c"} message={item}/> : null,
            (list || []).length ? <List key={index + "l"} message={item} connection={connection}/> : null,
            (options || []).length ? <Options key={index + "o"} options={options} connection={connection}/> : null
        ].filter(i => i)
    })
};

const Coffees = props => {
    const {name, coffees} = props;
    return coffees.map((coffee, index) => {
        return (
            <div key={index} style={{display: 'inline-block'}}>
                <Coffee name={name} size={coffee.size} coffee={coffee.coffee} count={coffee.count}/>
            </div>
        )
    })
}
//two tall filter coffee three grande cold brew four venti latte
//2 tall filter coffee 3 grande cold brew 4 venti latte

const Coffee = props => {
    const {name, size, count, coffee} = props;
    const sizes = {
        tall: 100,
        grande: 150,
        venti: 200
    };
    const width = sizes[size];
    const nameStyle = {
        width: width - 30,
        fontSize: (width / Math.max(...name.split(" ").map(i => i.length))) + 10,
        marginTop: 16 - width / Math.max(...name.split(" ").map(i => i.length)),
    };

    return (
        <div className="coffee-cup-container">
            <div className="badge">
                <div className="center" style={{height: "100%"}}>
                    x{count}
                </div>
            </div>
            <img src={coffeeCup} alt="Coffee Cup" className="coffee-cup-image" style={{width}}/>
            <div className="coffee-cup-name" style={nameStyle}>
                {name}
            </div>
            <div className="coffee-cup-coffee">
                {coffee}
            </div>
        </div>
    )
};

const Typing = () => {
    return (
        <div style={{display: "flex", justifyContent: "flex-start"}}>
            <div className="cell chatbot-chat-item"
                 style={{position: "relative", width: 25, padding: "16px 16px 24px 16px"}}>
                <span className="dot-bounce" style={{animationDelay: "0", left: 10}}>.</span>
                <span className="dot-bounce" style={{animationDelay: "0.2s", left: 20}}>.</span>
                <span className="dot-bounce" style={{animationDelay: "0.4s", left: 30}}>.</span>
            </div>
        </div>
    )
}

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
            <div className={'center input-container'} style={{position: "relative"}}>
                <input type="text"
                       id={"text-field"}
                       onChange={e => this.onChange(e.target.value)}
                       value={this.state.message}
                       className="full-width text-field"
                       onKeyPress={e => e.key === "Enter" ? this.onSend() : null}
                />
                <Suggestions connection={this.props.connection}
                             message={this.state.message}
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
                old(message)
            }
        }
    }


    render() {
        const {message} = this.props;
        if (!message)
            return null;
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
