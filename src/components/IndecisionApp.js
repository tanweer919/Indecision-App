import React from "react";
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from "./OptionModal"

export default class IndecisionApp extends React.Component {
    state = {
        options : [],
        selectedOption: undefined
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
    handleDeleteOptions = () => {
        this.setState(() => ({options: []}));
    }
    handlepick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({selectedOption: option}))
    }
    handleAddOption = (option) => {
        if(!option) {
            return 'Enter a valid option';
        }
        else if (this.state.options.indexOf(option) > -1) {
            return 'Option already exists';
        }
        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => (option !==optionToRemove))
        }))
    }
    handleClearSelected = () => {
        this.setState(() => ({selectedOption:undefined}));
    }
    render() {
        const title = "KeepUp";
        const subtitle = "A Todo list built in React";
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <div className="container">
                    <Action handlepick = {this.handlepick} hasOptions={this.state.options.length > 0} />
                    <div className="widget">
                        <Options options={this.state.options} handleDeleteOptions = {this.handleDeleteOptions} handleDeleteOption = {this.handleDeleteOption} hasOptions={this.state.options.length > 0}/>
                        <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                    <OptionModal selectedOption={this.state.selectedOption} handleClearSelected = {this.handleClearSelected} />
                </div>
            </div>
        );
    }
};