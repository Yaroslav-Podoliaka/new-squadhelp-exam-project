import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import className from 'classnames';
import {
  getDialogMessages,
  clearMessageList,
} from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import styles from './Dialog.module.sass';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';

class Dialog extends React.Component {
  componentDidMount() {
    this.props.getDialog({ interlocutorId: this.props.interlocutor.id });
    this.scrollToBottom();
  }

  messagesEnd = React.createRef();

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.interlocutor.id !== this.props.interlocutor.id)
      this.props.getDialog({ interlocutorId: nextProps.interlocutor.id });
  }

  componentWillUnmount() {
    this.props.clearMessageList();
  }

  componentDidUpdate() {
    if (this.messagesEnd.current) this.scrollToBottom();
  }

  renderMainDialog = () => {
    const messagesArray = [];
    const { messages, userId } = this.props;
    let currentTime = moment();
    messages.forEach((message, i) => {
      if (!currentTime.isSame(message.createdAt, 'date')) {
        messagesArray.push(
          <div key={message.createdAt} className={styles.date}>
            {moment(message.createdAt).format('MMMM DD, YYYY')}
          </div>
        );
        currentTime = moment(message.createdAt);
      }
      messagesArray.push(
        <div
          key={i}
          className={className(
            userId === message.sender ? styles.ownMessage : styles.message
          )}
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>
            {moment(message.createdAt).format('HH:mm')}
          </span>
          <div ref={this.messagesEnd} />
        </div>
      );
    });
    return <div className={styles.messageList}>{messagesArray}</div>;
  };

  blockMessage = () => {
    const { userId, chatData } = this.props;
    const { blackList, participants } = chatData;
    const userIndex = participants.indexOf(userId);
    let message;
    if (chatData && blackList[userIndex]) {
      message = 'You block him';
    } else if (chatData && blackList.includes(true)) {
      message = 'He block you';
    }
    return <span className={styles.messageBlock}>{message}</span>;
  };

  render() {
    const { chatData, userId } = this.props;
    return (
      <>
        <ChatHeader userId={userId} />
        {this.renderMainDialog()}
        <div ref={this.messagesEnd} />
        {chatData && chatData.blackList.includes(true) ? (
          this.blockMessage()
        ) : (
          <ChatInput />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  getDialog: (data) => dispatch(getDialogMessages(data)),
  clearMessageList: () => dispatch(clearMessageList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);

// import React, { useEffect, useRef } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { connect } from 'react-redux';
// import moment from 'moment';
// import className from 'classnames';
// import {
//   getDialogMessages,
//   clearMessageList,
// } from '../../../../store/slices/chatSlice';
// import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
// import ChatInput from '../../ChatComponents/ChatInut/ChatInput';
// import styles from './Dialog.module.sass';

// const Dialog = ({
//   messages,
//   chatData,
//   userId,
//   getDialogMessages,
//   clearMessageList,
// }) => {
//   // Получаем параметр interlocutorId из URL с помощью react-router-dom
//   const { interlocutorId } = useParams();
//   console.log('DIALOG interlocutorId: ', interlocutorId);
//   // Создаем ссылку для последнего элемента в списке сообщений
//   const messagesEnd = useRef();
//   const navigate = useNavigate();
//   // Загружаем сообщения при монтировании компонента и скроллим вниз
//   useEffect(() => {
//     getDialogMessages({ interlocutorId });
//     scrollToBottom();
//   }, [getDialogMessages, interlocutorId]);
//   // Проверяем изменение interlocutorId и обновляем сообщения
//   useEffect(() => {
//     if (interlocutorId !== chatData.interlocutorId) {
//       getDialogMessages({ interlocutorId });
//     }
//   }, [getDialogMessages, interlocutorId, chatData.interlocutorId]);
//   // Если есть новые сообщения, скроллим вниз
//   useEffect(() => {
//     if (messagesEnd.current) {
//       scrollToBottom();
//     }
//   }, [messages]);
//   // Функция для прокрутки вниз
//   const scrollToBottom = () => {
//     messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
//   };
//   // Рендер основного диалога
//   const renderMainDialog = () => {
//     const messagesArray = [];
//     let currentTime = moment();
//     messages.forEach((message, i) => {
//       if (!currentTime.isSame(message.createdAt, 'date')) {
//         messagesArray.push(
//           <div key={message.createdAt} className={styles.date}>
//             {moment(message.createdAt).format('MMMM DD, YYYY')}
//           </div>
//         );
//         currentTime = moment(message.createdAt);
//       }
//       messagesArray.push(
//         <div
//           key={i}
//           className={className(
//             userId === message.sender ? styles.ownMessage : styles.message
//           )}
//         >
//           <span>{message.body}</span>
//           <span className={styles.messageTime}>
//             {moment(message.createdAt).format('HH:mm')}
//           </span>
//           <div ref={messagesEnd} />
//         </div>
//       );
//     });
//     return <div className={styles.messageList}>{messagesArray}</div>;
//   };
//   // Рендер сообщения о блокировке
//   const blockMessage = () => {
//     const userIndex = chatData.participants.indexOf(userId);
//     let message;
//     if (chatData && chatData.blackList[userIndex]) {
//       message = 'You block him';
//     } else if (chatData && chatData.blackList.includes(true)) {
//       message = 'He block you';
//     }
//     return <span className={styles.messageBlock}>{message}</span>;
//   };

//   return (
//     <>
//       <ChatHeader userId={userId} />
//       {renderMainDialog()}
//       <div ref={messagesEnd} />
//       {chatData && chatData.blackList.includes(true) ? (
//         blockMessage()
//       ) : (
//         <ChatInput navigate={navigate} interlocutorId={interlocutorId} />
//       )}
//     </>
//   );
// };
// // Получаем данные из глобального состояния Redux
// const mapStateToProps = (state) => state.chatStore;
// // Получаем функции для работы с Redux
// const mapDispatchToProps = (dispatch) => ({
//   getDialogMessages: (data) => dispatch(getDialogMessages(data)),
//   clearMessageList: () => dispatch(clearMessageList()),
// });
// // Создаем подключенный компонент с помощью функции connect
// export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
