import http from '../interceptor';

export const registerRequest = data => http.post('registration', data);
export const loginRequest = data => http.post('login', data);
export const getUser = () => http.get('getUser');
export const updateContest = data => http.put('updateContest', data);
export const setNewOffer = data => http.post('setNewOffer', data);
export const setOfferStatus = data => http.post('setOfferStatus', data);
export const downloadContestFile = data =>
  http.get(`downloadFile/${data.fileName}`);
export const payMent = data => http.post('pay', data.formData);
export const changeMark = data => http.patch('changeMark', data);
export const getPreviewChat = () => http.get('getPreview');
export const getDialog = data => http.post('getChat', data);
export const dataForContest = data => http.post('dataForContest', data);
export const cashOut = data => http.post('cashout', data);
export const updateUser = data => http.put('updateUser', data);
export const newMessage = data => http.post('newMessage', data);
export const changeChatFavorite = data => http.patch('favorite', data);
export const changeChatBlock = data => http.patch('blackList', data);
export const getCatalogList = data => http.get('getCatalogs', data);
export const addChatToCatalog = data => http.post('addNewChatToCatalog', data);
export const createCatalog = data => http.post('createCatalog', data);
export const deleteCatalog = data => http.delete('deleteCatalog', data);
export const removeChatFromCatalog = data =>
  http.delete('removeChatFromCatalog', data);
export const changeCatalogName = data => http.patch('updateNameCatalog', data);
export const getCustomersContests = data =>
  http.post(
    'getCustomersContests',
    { limit: data.limit, offset: data.offset },
    {
      headers: {
        status: data.contestStatus,
      },
    }
  );

// export const getCustomersContests = ({ limit, offset, contestStatus }) =>
//   http.get(`/contests/getCustomersContests?status=${contestStatus}&limit=${limit}&offset=${offset}`);

// export const getActiveContests = ({
//     offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
//   }) =>
//     http.get(`/contests/getAllContests?${offset}&${limit}&${typeIndex}&${contestId}&${industry}&${awardSort}&${ownEntries}}`);

export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  http.post('getAllContests', {
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  });

export const getContestById = data =>
  http.get('getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });
