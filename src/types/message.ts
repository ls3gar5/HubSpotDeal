 /**
   * Type of AWS message
   */
export const MESSAGE = {
  NOTIFICATION: 'Notification',
  SUBSCRIPTIONCONFIRMATION: 'SubscriptionConfirmation',
  UNSUBSCRIBECONFIRMATION: 'UnsubscribeConfirmation'
};


export interface User {
  firstName: string;
  lastName: string;
  accountBalance: number;
}