// import React, { useEffect } from 'react';
// import { toast } from 'react-toastify';
// import WebSocket from './WebSocket';
// import Notification from '../../../components/Notification/Notification';

// const NotificationSocket = ({dispatch, getState, room}) => {

//     useEffect(() => {
//       const socket = new WebSocket(dispatch, getState, room);

//       const onChangeMark = () => {
//         socket.on('changeMark', () => {
//           toast('Someone liked your offer');
//         });
//       };

//       const onChangeOfferStatus = () => {
//         socket.on('changeOfferStatus', (message) => {
//           toast(
//             <Notification message={message.message} contestId={message.contestId} />
//           );
//         });
//       };

//       const onEntryCreated = () => {
//         socket.on('onEntryCreated', () => {
//           toast('New Entry');
//         });
//       };

//       const subscribe = (id) => {
//         socket.emit('subscribe', id);
//       };
    
//       const unsubsctibe = (id) => {
//         socket.emit('unsubscribe', id);
//       };

//       const anotherSubscribes = () => {
//         onChangeMark();
//         onChangeOfferStatus();
//         onEntryCreated();
//       };

//       anotherSubscribes();

//       return () => {
//         socket.off('changeMark');
//         socket.off('changeOfferStatus');
//         socket.off('onEntryCreated');
//       };
//     }, [dispatch, getState, room]);

//   return null;
// };

// export default NotificationSocket;


import React from 'react';
import { toast } from 'react-toastify';
import WebSocket from './WebSocket';
import Notification from '../../../components/Notification/Notification';

class NotificationSocket extends WebSocket {
  constructor (dispatch, getState, room) {
    super(dispatch, getState, room);
  }

  anotherSubscribes = () => {
    this.onEntryCreated();
    this.onChangeMark();
    this.onChangeOfferStatus();
  };

  onChangeMark = () => {
    this.socket.on('changeMark', () => {
      toast('Someone liked your offer');
    });
  };

  onChangeOfferStatus = () => {
    this.socket.on('changeOfferStatus', message => {
      toast(
        <Notification message={message.message} contestId={message.contestId} />
      );
    });
  };

  onEntryCreated = () => {
    this.socket.on('onEntryCreated', () => {
      toast('New Entry');
    });
  };

  subscribe = id => {
    this.socket.emit('subscribe', id);
  };

  unsubsctibe = id => {
    this.socket.emit('unsubscribe', id);
  };
}

export default NotificationSocket;
