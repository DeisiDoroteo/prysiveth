// in ActionProvider.jsx
import React from 'react';



const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hola ¿Como puedo ayudarte el dia de hoy?.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const cancelarC = () => {
    const botMessage = createChatBotMessage('Para cancelar un compra puedes asistir a una sucursusal o llamar 5546543703');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const Horarios = () => {
    const botMessage = createChatBotMessage('Hola nuestro horario de atención es de lunes a viernes de 8:00 am a 6:00 pm y sabados de 9:00 am a 4:00 pm');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            cancelarC,
            Horarios
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;