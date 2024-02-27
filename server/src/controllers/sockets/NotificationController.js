const WebSocket = require('./WebSocket');
const CONSTANTS = require('../../constants/constants');

class NotificationController extends WebSocket{
  // Метод для отправки уведомления о создании записи
  emitEntryCreated (target) {
    // Отправка сообщения события о создании записи целевому получателю
    this.io.to(target).emit(CONSTANTS.NOTIFICATION_ENTRY_CREATED);
  }
  // Метод для отправки уведомления об изменении оценки
  emitChangeMark (target) {
    // Отправка сообщения события об изменении оценки целевому получателю
    this.io.to(target).emit(CONSTANTS.NOTIFICATION_CHANGE_MARK);
  }
  // Метод для отправки уведомления об изменении статуса предложения
  emitChangeOfferStatus (target, message, contestId) {
    // Отправка сообщения события об изменении статуса предложения целевому получателю
    // В сообщении передается текст сообщения и идентификатор конкурса
    this.io.to(target).emit(CONSTANTS.NOTIFICATION_CHANGE_OFFER_STATUS,
      { message, contestId });
  }
}

module.exports = NotificationController;
