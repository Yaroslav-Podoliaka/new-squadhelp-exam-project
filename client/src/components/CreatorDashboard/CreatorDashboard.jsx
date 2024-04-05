import React, { useEffect, useCallback, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import {
  getContests,
  clearContestsList,
  setNewCreatorFilter,
} from '../../store/slices/contestsSlice';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import TryAgain from '../TryAgain/TryAgain';
import CONSTANTS from '../../constants';
import styles from './CreatorDashboard.module.sass';
// Массив типов контестов
const types = [
  '',
  'name, tagline, logo',
  'name',
  'tagline',
  'logo',
  'name, tagline',
  'logo, tagline',
  'name, logo',
];

const CreatorDashboard = ({
  navigate,
  location,
  contests,
  creatorFilter,
  haveMore,
  error,
  isFetching,
  dataForContest,
  getContests,
  clearContestsList,
  newFilter,
  getDataForContest,
}) => {
  // const navigate = useNavigate();
  // Создание рефа для отслеживания предыдущего значения параметров поиска
  const prevLocationSearchRef = useRef(location?.search);
  const [loading, setLoading] = useState(false);
  const [prevCreatorFilter, setCreatorFilter] = useState(null);
  // Функция для обновления параметров в URL
  const parseParamsToUrl = (creatorFilter) => {
    const obj = {};
    // Формирование объекта параметров из объекта фильтра
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) obj[el] = creatorFilter[el];
    });
    // Навигация по URL с использованием параметров
    navigate(`/Dashboard?${queryString.stringify(obj)}`);
  };
  // Функция для изменения предиката фильтрации
  const changePredicate = ({ name, value }) => {
    // Обновление фильтра с новым значением
    newFilter({
      [name]: value === 'Choose industry' ? null : value,
    });
    // Обновление параметров URL
    parseParamsToUrl({
      ...creatorFilter,
      ...{ [name]: value === 'Choose industry' ? null : value },
    });
  };
  // Функция для отрисовки выпадающего списка типов контестов
  const renderSelectType = () => {
    const array = [];
    types.forEach(
      (el, i) =>
        !i ||
        array.push(
          <option key={i - 1} value={el}>
            {el}
          </option>
        )
    );
    return (
      <select
        onChange={({ target }) =>
          changePredicate({
            name: 'typeIndex',
            value: types.indexOf(target.value),
          })
        }
        value={types[creatorFilter.typeIndex]}
        className={styles.input}
      >
        {array}
      </select>
    );
  };
  // Функция для отрисовки выпадающего списка отраслей
  const renderIndustryType = () => {
    const array = [];
    const industryData = dataForContest.data;
    if (!industryData) {
      return null;
    }
    array.push(
      <option key={0} value="">
        Choose industry
      </option>
    );
    industryData.industry.forEach((industry, i) =>
      array.push(
        <option key={i + 1} value={industry}>
          {industry}
        </option>
      )
    );
    return (
      <select
        onChange={({ target }) =>
          changePredicate({
            name: 'industry',
            value: target.value,
          })
        }
        value={creatorFilter.industry || ''}
        className={styles.input}
      >
        {array}
      </select>
    );
  };
  // Мемоизированная функция для обработки параметров URL
  const parseUrlForParams = useCallback(
    (search) => {
      // Разбор параметров поиска
      const obj = queryString.parse(search);
      // Формирование объекта фильтра
      const filter = {
        typeIndex: obj.typeIndex || 1,
        contestId: obj.contestId ? obj.contestId : '',
        industry: obj.industry ? obj.industry : '',
        awardSort: obj.awardSort || 'asc',
        ownEntries:
          typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
      };
      // Проверка на изменение фильтра
      if (!isEqual(filter, creatorFilter)) {
        // Обновление фильтра и очистка списка контестов
        newFilter(filter);
        clearContestsList();
        // Загрузка контестов с новым фильтром
        getContests(filter);
        return false;
      }
      return true;
    },
    [clearContestsList, creatorFilter, getContests, newFilter]
  );
  // Функция для получения предиката запроса
  const getPredicateOfRequest = () => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };
  // Функция для загрузки дополнительных контестов
  const loadMore = (startFrom) => {
    if (!loading) {
      setLoading(true);
      getContests({
        limit: 8,
        offset: startFrom,
        ...getPredicateOfRequest(),
      });
    }
  };
  // Функция для перехода к расширенному виду контеста
  const goToExtended = (contestId) => {
    navigate(`/contest/${contestId}`);
  };
  // Функция для создания списка компонентов ContestBox
  const setContestList = () => {
    console.log('CreatorDascboard contests: ', contests);
    return contests.map((contest) => (
      <ContestBox
        data={contest}
        key={contest.id}
        goToExtended={goToExtended} />
    ));
  };
  // const setContestList = () => {
  //   console.log('CreatorDascboard contests: ', contests);
  //   const array = [];
  //   for (let i = 0; i < contests.length; i++) {
  //     array.push(
  //       <ContestBox
  //         data={contests[i]}
  //         key={contests[i].id}
  //         goToExtended={goToExtended}
  //       />
  //     );
  //   }
  //   return array;
  // };
  // Функция для повторной загрузки контестов после ошибки
  const tryLoadAgain = () => {
    clearContestsList();
    getContests({
      limit: 8,
      offset: 0,
      ...getPredicateOfRequest(),
    });
  };
  // Инициализация данных при загрузке компонента и обработки параметров URL
  useEffect(() => {
    getDataForContest();
    // Если параметры URL изменились и список контестов пуст, загрузить контесты
    if (location && parseUrlForParams(location.search) && !contests.length) {
      getContests(creatorFilter);
    }
  }, [
    getDataForContest,
    location,
    // location?.search,
    parseUrlForParams,
    contests.length,
    creatorFilter,
    getContests,
  ]);
  // Обработка изменений параметров URL
  useEffect(() => {
    // getDataForContest();
    // Если параметры URL изменились, обработать их
    if (prevLocationSearchRef.current !== location?.search) {
      parseUrlForParams(location?.search);
    }
    prevLocationSearchRef.current = location?.search;
  }, [/**getDataForContest,**/ location?.search, parseUrlForParams]);

  useEffect(() => {
    if (creatorFilter !== prevCreatorFilter) {
      clearContestsList();
      getContests({
        limit: 8,
        offset: 0,
        ...creatorFilter,
      });
      setCreatorFilter(creatorFilter);
    }
  },[creatorFilter, prevCreatorFilter, clearContestsList, getContests]);

  useEffect(() => {
    if (haveMore) {
      setLoading(false);
    }
  },[haveMore]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <span className={styles.headerFilter}>Filter Results</span>
        <div className={styles.inputsContainer}>
          <div
            onClick={() =>
              changePredicate({
                name: 'ownEntries',
                value: !creatorFilter.ownEntries,
              })
            }
            className={classNames(styles.myEntries, {
              [styles.activeMyEntries]: creatorFilter.ownEntries,
            })}
          >
            My Entries
          </div>
          <div className={styles.inputContainer}>
            <span>By contest type</span>
            {renderSelectType()}
          </div>
          <div className={styles.inputContainer}>
            <span>By contest ID</span>
            <input
              type="text"
              onChange={({ target }) =>
                changePredicate({
                  name: 'contestId',
                  value: target.value,
                })
              }
              name="contestId"
              value={creatorFilter.contestId}
              className={styles.input}
            />
          </div>
          {!isFetching && (
            <div className={styles.inputContainer}>
              <span>By industry</span>
              {renderIndustryType()}
            </div>
          )}
          <div className={styles.inputContainer}>
            <span>By amount award</span>
            <select
              onChange={({ target }) =>
                changePredicate({
                  name: 'awardSort',
                  value: target.value,
                })
              }
              value={creatorFilter.awardSort}
              className={styles.input}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>
      {error ? (
        <div className={styles.messageContainer}>
          <TryAgain getData={tryLoadAgain} />
        </div>
      ) : (
        <ContestsContainer
          isFetching={isFetching}
          loadMore={loadMore}
          haveMore={haveMore}
          // navigate={navigate}
        >
          {setContestList()}
        </ContestsContainer>
      )}
    </div>
  );
};
// Функция сопоставления состояния Redux с свойствами компонента
const mapStateToProps = (state) => {
  const { contestsList, dataForContest } = state;
  return { ...contestsList, dataForContest };
};
// Функция сопоставления действий Redux с свойствами компонента
const mapDispatchToProps = (dispatch) => ({
  getContests: (data) =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CREATOR })),
    clearContestsList: () => dispatch(clearContestsList()),
    newFilter: (filter) => dispatch(setNewCreatorFilter(filter)),
    getDataForContest: () => dispatch(getDataForContest()),
});
// Подключение компонента к Redux
export default connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard);

/**import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import {
  getContests,
  clearContestsList,
  setNewCreatorFilter,
} from '../../store/slices/contestsSlice';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CreatorDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';
import CONSTANTS from '../../constants';

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

class CreatorDashboard extends React.Component {
  renderSelectType = () => {
    const array = [];
    const { creatorFilter } = this.props;
    types.forEach(
      (el, i) =>
        !i ||
        array.push(
          <option key={i - 1} value={el}>
            {el}
          </option>
        )
    );
    return (
      <select
        onChange={({ target }) =>
          this.changePredicate({
            name: 'typeIndex',
            value: types.indexOf(target.value),
          })
        }
        value={types[creatorFilter.typeIndex]}
        className={styles.input}
      >
        {array}
      </select>
    );
  };

  renderIndustryType = () => {
    const array = [];
    const { creatorFilter } = this.props;
    const { industry } = this.props.dataForContest.data;
    array.push(
      <option key={0} value={null}>
        Choose industry
      </option>
    );
    industry.forEach((industry, i) =>
      array.push(
        <option key={i + 1} value={industry}>
          {industry}
        </option>
      )
    );
    return (
      <select
        onChange={({ target }) =>
          this.changePredicate({
            name: 'industry',
            value: target.value,
          })
        }
        value={creatorFilter.industry}
        className={styles.input}
      >
        {array}
      </select>
    );
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.location.search !== this.props.location.search) {
      this.parseUrlForParams(nextProps.location.search);
    }
  }

  componentDidMount() {
    this.props.getDataForContest();
    if (
      this.parseUrlForParams(this.props.location.search) &&
      !this.props.contests.length
    )
      this.getContests(this.props.creatorFilter);
  }

  getContests = (filter) => {
    this.props.getContests({
      limit: 8,
      offset: 0,
      ...filter,
    });
  };

  changePredicate = ({ name, value }) => {
    const { creatorFilter } = this.props;
    this.props.newFilter({
      [name]: value === 'Choose industry' ? null : value,
    });
    this.parseParamsToUrl({
      ...creatorFilter,
      ...{ [name]: value === 'Choose industry' ? null : value },
    });
  };

  parseParamsToUrl = (creatorFilter) => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) obj[el] = creatorFilter[el];
    });
    this.props.history.push(`/Dashboard?${queryString.stringify(obj)}`);
  };

  parseUrlForParams = (search) => {
    const obj = queryString.parse(search);
    const filter = {
      typeIndex: obj.typeIndex || 1,
      contestId: obj.contestId ? obj.contestId : '',
      industry: obj.industry ? obj.industry : '',
      awardSort: obj.awardSort || 'asc',
      ownEntries:
        typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
    };
    if (!isEqual(filter, this.props.creatorFilter)) {
      this.props.newFilter(filter);
      this.props.clearContestsList();
      this.getContests(filter);
      return false;
    }
    return true;
  };

  getPredicateOfRequest = () => {
    const obj = {};
    const { creatorFilter } = this.props;
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  loadMore = (startFrom) => {
    this.props.getContests({
      limit: 8,
      offset: startFrom,
      ...this.getPredicateOfRequest(),
    });
  };

  setContestList = () => {
    const array = [];
    const { contests } = this.props;
    for (let i = 0; i < contests.length; i++) {
      array.push(
        <ContestBox
          data={contests[i]}
          key={contests[i].id}
          goToExtended={this.goToExtended}
        />
      );
    }
    return array;
  };

  goToExtended = (contestId) => {
    this.props.history.push(`/contest/${contestId}`);
  };

  tryLoadAgain = () => {
    this.props.clearContestsList();
    this.props.getContests({
      limit: 8,
      offset: 0,
      ...this.getPredicateOfRequest(),
    });
  };

  render() {
    const { error, haveMore, creatorFilter } = this.props;
    const { isFetching } = this.props.dataForContest;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <span className={styles.headerFilter}>Filter Results</span>
          <div className={styles.inputsContainer}>
            <div
              onClick={() =>
                this.changePredicate({
                  name: 'ownEntries',
                  value: !creatorFilter.ownEntries,
                })
              }
              className={classNames(styles.myEntries, {
                [styles.activeMyEntries]: creatorFilter.ownEntries,
              })}
            >
              My Entries
            </div>
            <div className={styles.inputContainer}>
              <span>By contest type</span>
              {this.renderSelectType()}
            </div>
            <div className={styles.inputContainer}>
              <span>By contest ID</span>
              <input
                type="text"
                onChange={({ target }) =>
                  this.changePredicate({
                    name: 'contestId',
                    value: target.value,
                  })
                }
                name="contestId"
                value={creatorFilter.contestId}
                className={styles.input}
              />
            </div>
            {!isFetching && (
              <div className={styles.inputContainer}>
                <span>By industry</span>
                {this.renderIndustryType()}
              </div>
            )}
            <div className={styles.inputContainer}>
              <span>By amount award</span>
              <select
                onChange={({ target }) =>
                  this.changePredicate({
                    name: 'awardSort',
                    value: target.value,
                  })
                }
                value={creatorFilter.awardSort}
                className={styles.input}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>
        {error ? (
          <div className={styles.messageContainer}>
            <TryAgain getData={this.tryLoadAgain} />
          </div>
        ) : (
          <ContestsContainer
            isFetching={this.props.isFetching}
            loadMore={this.loadMore}
            history={this.props.history}
            haveMore={haveMore}
          >
            {this.setContestList()}
          </ContestsContainer>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { contestsList, dataForContest } = state;
  return { ...contestsList, dataForContest };
};

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CREATOR })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCreatorFilter(filter)),
  getDataForContest: () => dispatch(getDataForContest()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard)
);**/
