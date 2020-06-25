import firebase from 'firebase/app';
import 'firebase/auth';

const getUid = () => firebase.auth().currentUser.uid;

const getCurrentUser = () => firebase.auth().currentUser;

export default { getUid, getCurrentUser };
