import { combineReducers } from 'redux';

// // import errorReducer from './errorReducer';
import authReducer from './authReducer';

// import campaignReducer from './campaignReducer';

// import blockchainReducer from "./blockchainReducer"
import errorReducer from "./errorReducer"
// import profileReducer from "./profileReducer"
// import organisationReducer from "./organisationReducer"
// import payReducer from "./payReducer"
// import dashboardReducer from "./dashboardReducer"
// import feedbackReducer from "./feedbackReducer"
// import contributorReducers from "./contributorReducers"
// import txReducer from "./txReducers"
// import adminReducer from "./adminReducer"
// import flutterwaveReducer from "./flutterwaveReducer"
// import payoutReducer from "./payoutReducers"
// import blogReducer from "./blogReducer"
// import badgeReducer from "./badgeReducer"
// import newsletterReducer from "./newsletterReducer"
// import userReducer from "./userReducer"
// import writerReducer from "./writerReducer"

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
//   campaign : campaignReducer,
//   error:errorReducer,
//   profile:profileReducer,
//   organisation:organisationReducer,
//   pay:payReducer,
//   dashboard:dashboardReducer,
//   feedback:feedbackReducer,
//   contributors:contributorReducers,
//   tx:txReducer,
//   admin:adminReducer,
//   flutterwave:flutterwaveReducer,
//   payout:payoutReducer,
//   blog:blogReducer,
//   badge:badgeReducer,
//   newsletter:newsletterReducer,
//   userRed:userReducer,
//   writer:writerReducer
  // blockchain:blockchainReducer
});
