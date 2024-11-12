// in MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('Hola')) {
      actions.handleHello();
    } if (message.includes('como puedo cancelar una compra?')) {
        actions.cancelarC();
  }else if(message.includes('Como puedo cancelar una compra?')){
    actions.cancelarC();
  }if (message.includes('Cuales son los horarios de atención?')) {
    actions.Horarios();
}


}

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;