import React from 'react';
import Option from './Option';

const  Options = (props) =>(
        <div>
            <div className="widget-header">
                <h3 className="widget-header__title">Your Options</h3>
                <button className="button button--link" onClick={props.handleDeleteOptions} disabled={!props.hasOptions}>Remove All</button>
            </div>
            {props.options.length === 0 && <p className="widget__message">Please add an option to get started</p> }
            {props.options.map((option,index) => <Option count={index + 1} option={option} handleDeleteOption={props.handleDeleteOption} key={option} />)}
        </div>
    );
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
export default Options;