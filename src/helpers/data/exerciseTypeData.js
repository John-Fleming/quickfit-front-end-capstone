import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getExerciseTypes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/exerciseTypes.json`)
    .then((resp) => {
      const allExerciseTypes = resp.data;
      const types = [];
      if (allExerciseTypes != null) {
        Object.keys(allExerciseTypes).forEach((typeId) => {
          allExerciseTypes[typeId].id = typeId;
          types.push(allExerciseTypes[typeId]);
        });
      }
      resolve(types);
    })
    .catch((err) => reject(err));
});

export default { getExerciseTypes };
