import React from 'react';

const Action = (props) => (
        <div>
            <button className="big-button" onClick= {props.handlepick} disabled={!props.hasOptions}>
                What should i do?
            </button>
        </div>
    );
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
export default Action;