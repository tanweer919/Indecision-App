import React from 'react';

const Option = (props) => (
        <div className="option">
            <p className="option__text"> {props.count}. {props.option}</p>
            <button
                className="button button--link"
                onClick={(e) => {
                    props.handleDeleteOption(props.option);
                }}>Remove</button>
        </div>
    );
// class Option extends React.Component {
//     render() {
//         return (
//             <div>{this.props.option}</div>
//         );
//     }
// }
export default Option;