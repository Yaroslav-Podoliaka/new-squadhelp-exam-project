import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-18-image-lightbox';
import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
// import Header from '../../components/Header/Header';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/OfferForm/OfferForm';
import CONSTANTS from '../../constants';
import Brief from '../../components/Brief/Brief';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import 'react-18-image-lightbox/style.css';
import Error from '../../components/Error/Error';
import styles from './ContestPage.module.sass';

const ContestPage = ({
contestByIdStore,
userStore,
chatStore,
getData,
setOfferStatus,
clearSetOfferStatusError,
goToExpandedDialog,
changeEditContest,
changeContestViewMode,
changeShowImage,
// params,
}) => {
  // Получение роли пользователя из стора
  const {role} = userStore.data;
  // Извлечение данных из стора о конкретном конкурсе
  const {
    isShowOnFull,
    imagePath,
    error,
    isFetching,
    isBrief,
    contestData,
    offers,
    setOfferStatusError,
  } = contestByIdStore;
  // Извлечение id конкурса из contestData
  const {id} = contestData || {};
  // const navigate = useNavigate();
  // Получение параметров URL
  const params = useParams();
  // Загрузка данных при монтировании компонента
  useEffect(() => {
    getData({contestId: params.id});
    // Очистка данных при размонтировании компонента
    return () => {
      changeEditContest(false);
    };
  }, [params.id, getData, changeEditContest]);

  console.log(contestByIdStore);

  // Формирование списка предложений
  const setOffersList = () => {
    const array = [];
    for (let i = 0; i < offers.length; i++) {
      array.push(
        <OfferBox
          data={offers[i]}
          key={offers[i].id}
          needButtons={needButtons}
          setOfferStatus={handleSetOfferStatus}
          contestType={contestData.contestType}
          date={new Date()}
        />
      );
    }
    return array.length !== 0 ? (
      array
    ) : (
      <div className={styles.notFound}>
        There is no suggestion at this moment
      </div>
    );
  };
  // Функция определения необходимости кнопок в предложении
  const needButtons = (offerStatus) => {
    const contestCreatorId = contestData.User.id;
    const userId = userStore.data.id;
    const contestStatus = contestData.status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
      offerStatus === CONSTANTS.OFFER_STATUS_PENDING
    );
  };
  // Обработчик установки статуса предложения
  const handleSetOfferStatus = (creatorId, offerId, command) => {
    clearSetOfferStatusError();
    const { orderId, priority } = contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    setOfferStatus(obj);
  };
  // Поиск информации о беседе
  const findConversationInfo = (interlocutorId) => {
    const { messagesPreview } = chatStore;
    const { id } = userStore.data;
    const participants = [id, interlocutorId];
    participants.sort(
      (participant1, participant2) => participant1 - participant2);
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };
  // Переход к беседе
  const goChat = () => {
    const { User } = contestData;
    goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(User.id),
    });
  };
  
    return (
      <div>
        {/* <Chat/> */}
        {isShowOnFull && (
          <LightBox
            mainSrc={`${CONSTANTS.publicURL}${imagePath}`}
            onCloseRequest={() =>
              changeShowImage({ isShowOnFull: false, imagePath: null })
            }
          />
        )}
        {/* <Header /> */}
        {error ? (
          <div className={styles.tryContainer}>
            <TryAgain getData={getData} />
          </div>
        ) : isFetching ? (
          <div className={styles.containerSpinner}>
            <Spinner />
          </div>
        ) : (
          <div className={styles.mainInfoContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.buttonsContainer}>
                <span
                  onClick={() => changeContestViewMode(true)}
                  className={classNames(styles.btn, {
                    [styles.activeBtn]: isBrief,
                  })}
                >
                  Brief
                </span>
                <span
                  onClick={() => changeContestViewMode(false)}
                  className={classNames(styles.btn, {
                    [styles.activeBtn]: !isBrief,
                  })}
                >
                  Offer
                </span>
              </div>
              {isBrief ? (
                <Brief
                  contestData={contestData}
                  role={role}
                  goChat={goChat}
                />
              ) : (
                <div className={styles.offersContainer}>
                  {role === CONSTANTS.CREATOR &&
                    contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE && (
                      <OfferForm
                        contestType={contestData.contestType}
                        contestId={contestData.id}
                        customerId={contestData.User.id}
                      />
                    )}
                  {setOfferStatusError && (
                    <Error
                      data={setOfferStatusError.data}
                      status={setOfferStatusError.status}
                      clearError={clearSetOfferStatusError}
                    />
                  )}
                  <div className={styles.offers}>{setOffersList()}</div>
                </div>
              )}
            </div>
            <ContestSideBar
              contestData={contestData}
              totalEntries={offers.length}
            />
          </div>
        )}
      </div>
    );
};
// Отображение состояния Redux в свойствах компонента
const mapStateToProps = (state) => {
  const { contestByIdStore, userStore, chatStore } = state;
  return { contestByIdStore, userStore, chatStore };
};
// Подключение actions Redux к свойствам компонента
const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getContestById(data)),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});
// Подключение компонента к Redux
export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);


// import React from 'react';
// import { connect } from 'react-redux';
// import classNames from 'classnames';
// import isEqual from 'lodash/isEqual';
// import LightBox from 'react-18-image-lightbox';
// import { goToExpandedDialog } from '../../store/slices/chatSlice';
// import {
//   getContestById,
//   setOfferStatus,
//   clearSetOfferStatusError,
//   changeEditContest,
//   changeContestViewMode,
//   changeShowImage,
// } from '../../store/slices/contestByIdSlice';
// import Header from '../../components/Header/Header';
// import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
// import styles from './ContestPage.module.sass';
// import OfferBox from '../../components/OfferBox/OfferBox';
// import OfferForm from '../../components/OfferForm/OfferForm';
// import CONSTANTS from '../../constants';
// import Brief from '../../components/Brief/Brief';
// import Spinner from '../../components/Spinner/Spinner';
// import TryAgain from '../../components/TryAgain/TryAgain';
// import 'react-18-image-lightbox/style.css';
// import Error from '../../components/Error/Error';

// class ContestPage extends React.Component {
//   componentWillUnmount() {
//     this.props.changeEditContest(false);
//   }

//   componentDidMount() {
//     this.getData();
//   }

//   getData = () => {
//     const { params } = this.props.match;
//     this.props.getData({ contestId: params.id });
//   };

//   setOffersList = () => {
//     const array = [];
//     for (let i = 0; i < this.props.contestByIdStore.offers.length; i++) {
//       array.push(
//         <OfferBox
//           data={this.props.contestByIdStore.offers[i]}
//           key={this.props.contestByIdStore.offers[i].id}
//           needButtons={this.needButtons}
//           setOfferStatus={this.setOfferStatus}
//           contestType={this.props.contestByIdStore.contestData.contestType}
//           date={new Date()}
//         />
//       );
//     }
//     return array.length !== 0 ? (
//       array
//     ) : (
//       <div className={styles.notFound}>
//         There is no suggestion at this moment
//       </div>
//     );
//   };

//   needButtons = (offerStatus) => {
//     const contestCreatorId = this.props.contestByIdStore.contestData.User.id;
//     const userId = this.props.userStore.data.id;
//     const contestStatus = this.props.contestByIdStore.contestData.status;
//     return (
//       contestCreatorId === userId &&
//       contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
//       offerStatus === CONSTANTS.OFFER_STATUS_PENDING
//     );
//   };

//   setOfferStatus = (creatorId, offerId, command) => {
//     this.props.clearSetOfferStatusError();
//     const { id, orderId, priority } = this.props.contestByIdStore.contestData;
//     const obj = {
//       command,
//       offerId,
//       creatorId,
//       orderId,
//       priority,
//       contestId: id,
//     };
//     this.props.setOfferStatus(obj);
//   };

//   findConversationInfo = (interlocutorId) => {
//     const { messagesPreview } = this.props.chatStore;
//     const { id } = this.props.userStore.data;
//     const participants = [id, interlocutorId];
//     participants.sort(
//       (participant1, participant2) => participant1 - participant2
//     );
//     for (let i = 0; i < messagesPreview.length; i++) {
//       if (isEqual(participants, messagesPreview[i].participants)) {
//         return {
//           participants: messagesPreview[i].participants,
//           _id: messagesPreview[i]._id,
//           blackList: messagesPreview[i].blackList,
//           favoriteList: messagesPreview[i].favoriteList,
//         };
//       }
//     }
//     return null;
//   };

//   goChat = () => {
//     const { User } = this.props.contestByIdStore.contestData;
//     this.props.goToExpandedDialog({
//       interlocutor: User,
//       conversationData: this.findConversationInfo(User.id),
//     });
//   };

//   render() {
//     const { role } = this.props.userStore.data;
//     const {
//       contestByIdStore,
//       changeShowImage,
//       changeContestViewMode,
//       getData,
//       clearSetOfferStatusError,
//     } = this.props;
//     const {
//       isShowOnFull,
//       imagePath,
//       error,
//       isFetching,
//       isBrief,
//       contestData,
//       offers,
//       setOfferStatusError,
//     } = contestByIdStore;
//     return (
//       <div>
//         {/* <Chat/> */}
//         {isShowOnFull && (
//           <LightBox
//             mainSrc={`${CONSTANTS.publicURL}${imagePath}`}
//             onCloseRequest={() =>
//               changeShowImage({ isShowOnFull: false, imagePath: null })
//             }
//           />
//         )}
//         <Header />
//         {error ? (
//           <div className={styles.tryContainer}>
//             <TryAgain getData={getData} />
//           </div>
//         ) : isFetching ? (
//           <div className={styles.containerSpinner}>
//             <Spinner />
//           </div>
//         ) : (
//           <div className={styles.mainInfoContainer}>
//             <div className={styles.infoContainer}>
//               <div className={styles.buttonsContainer}>
//                 <span
//                   onClick={() => changeContestViewMode(true)}
//                   className={classNames(styles.btn, {
//                     [styles.activeBtn]: isBrief,
//                   })}
//                 >
//                   Brief
//                 </span>
//                 <span
//                   onClick={() => changeContestViewMode(false)}
//                   className={classNames(styles.btn, {
//                     [styles.activeBtn]: !isBrief,
//                   })}
//                 >
//                   Offer
//                 </span>
//               </div>
//               {isBrief ? (
//                 <Brief
//                   contestData={contestData}
//                   role={role}
//                   goChat={this.goChat}
//                 />
//               ) : (
//                 <div className={styles.offersContainer}>
//                   {role === CONSTANTS.CREATOR &&
//                     contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE && (
//                       <OfferForm
//                         contestType={contestData.contestType}
//                         contestId={contestData.id}
//                         customerId={contestData.User.id}
//                       />
//                     )}
//                   {setOfferStatusError && (
//                     <Error
//                       data={setOfferStatusError.data}
//                       status={setOfferStatusError.status}
//                       clearError={clearSetOfferStatusError}
//                     />
//                   )}
//                   <div className={styles.offers}>{this.setOffersList()}</div>
//                 </div>
//               )}
//             </div>
//             <ContestSideBar
//               contestData={contestData}
//               totalEntries={offers.length}
//             />
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   const { contestByIdStore, userStore, chatStore } = state;
//   return { contestByIdStore, userStore, chatStore };
// };

// const mapDispatchToProps = (dispatch) => ({
//   getData: (data) => dispatch(getContestById(data)),
//   setOfferStatus: (data) => dispatch(setOfferStatus(data)),
//   clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
//   goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
//   changeEditContest: (data) => dispatch(changeEditContest(data)),
//   changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
//   changeShowImage: (data) => dispatch(changeShowImage(data)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);
