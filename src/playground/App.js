import React from 'react';
import ReactDom from 'react-dom';


class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlepick = this.handlepick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options : []
        }
    }
    componentDidMount() {
        try {
            const options = JSON.parse(localStorage.getItem('options'));
            if(options) {
                this.setState(() => ({options:options}));
            }
        } catch (e) {
            //Do nothing at all
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);


        }
    }
    componentWillUnmount() {

    }
    handleDeleteOptions() {
        this.setState(() => ({options: []}));
    }
    handlepick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOption(option) {
        if(!option) {
            return 'Enter a valid option';
        }
        else if (this.state.options.indexOf(option) > -1) {
            return 'Option already exists';
        }
        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    }
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => (option !==optionToRemove))
        }))
    }
    render() {
        const title = "Indecision App";
        const subtitle = "!!Put your life on the line";
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action handlepick = {this.handlepick} hasOptions={this.state.options.length > 0} />
                <Options options={this.state.options} handleDeleteOptions = {this.handleDeleteOptions} handleDeleteOption = {this.handleDeleteOption} hasOptions={this.state.options.length > 0}/>
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        );
    }
}
const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}
// class Header extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <h2>{this.props.subtitle}</h2>
//             </div>
//         );
//     }
// }
const Action = (props) => {
    return (
        <div>
            <button onClick= {props.handlepick} disabled={!props.hasOptions}>
                What should i do?
            </button>
        </div>
    );
}
// class Action extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button onClick= {this.props.handlepick} disabled={!this.props.hasOptions}>
//                     What should i do?
//                 </button>
//             </div>
//         );
//     }
// }
const  Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions} disabled={!props.hasOptions}>Remove all options</button>
            {props.options.map((option) => <Option option={option} handleDeleteOption={props.handleDeleteOption} key={option} />)}
        </div>
    );
}
// class Options extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button onClick={this.props.handleDeleteOptions} disabled={!this.props.hasOptions}>Remove all options</button>
//                 {this.props.options.map((option) => <Option option={option} key={option} />)}
//             </div>
//         );
//     }
// }
const Option = (props) => {
    return (
        <div>
            {props.option}
            <button
                onClick={(e) => {
                props.handleDeleteOption(props.option);
            }}>Delete</button>
            </div>
    );
}
// class Option extends React.Component {
//     render() {
//         return (
//             <div>{this.props.option}</div>
//         );
//     }
// }
class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        this.setState(() => {
            return {
                error
            }
        })
        e.target.elements.option.value = '';

    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"></input>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}
ReactDOM.render(<IndecisionApp />, document.getElementById("app"));