import React, { useCallback, useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import styles from './ContestContainer.module.sass';

const ContestsContainer = ({ isFetching, haveMore, loadMore, children }) => {
  const [loading, setLoading] = useState(false);
  // Определяем функцию-обработчик события прокрутки
  const scrollHandler = useCallback(() => {
    if (
      !loading &&
      haveMore &&
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (haveMore) {
        setLoading(true);
        // Вызываем функцию загрузки данных
        loadMore(children.length);
      }
    }
    // }
  }, [loading, setLoading, haveMore, loadMore, children]);

  useEffect(() => {
    // Добавляем слушатель события прокрутки при монтировании компонента
    window.addEventListener('scroll', scrollHandler);
    // Возвращаем функцию для удаления слушателя события прокрутки при размонтировании компонента
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  useEffect(() => {
    if (haveMore) {
      setLoading(false);
    }
  }, [haveMore]);

  // Проверяем, загружаются ли данные и их количество
  if (!isFetching && children.length === 0) {
    // Возвращаем сообщение о том, что ничего не найдено, если данных нет
    return <div className={styles.notFound}>Nothing not found</div>;
  }

  return (
    <div>
      {isFetching && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
      {children}
    </div>
  );
};

export default ContestsContainer;

// import React from 'react';
// import styles from './ContestContainer.module.sass';
// import Spinner from '../Spinner/Spinner';

// class ContestsContainer extends React.Component {
//   componentDidMount () {
//     window.addEventListener('scroll', this.scrollHandler);
//   }

//   componentWillUnmount () {
//     window.removeEventListener('scroll', this.scrollHandler);
//   }

//   scrollHandler = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop ===
//       document.documentElement.offsetHeight
//     ) {
//       if (this.props.haveMore) {
//         this.props.loadMore(this.props.children.length);
//       }
//     }
//   };

//   render () {
//     const { isFetching } = this.props;
//     if (!isFetching && this.props.children.length === 0) {
//       return <div className={styles.notFound}>Nothing not found</div>;
//     }
//     return (
//       <div>
//         {this.props.children}
//         {isFetching && (
//           <div className={styles.spinnerContainer}>
//             <Spinner />
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default ContestsContainer;
