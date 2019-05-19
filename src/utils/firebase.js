import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-storage';

import config from '../config';

firebase.initializeApp(config.firebase);

export default firebase;
