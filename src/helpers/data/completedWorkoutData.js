import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getCompletedWorkoutsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/completedWorkouts.json?orderBy="UID"&equalTo="${uid}"`)
    .then((resp) => {
      const completeWorkouts = resp.data;
      const workouts = [];
      if (completeWorkouts != null) {
        Object.keys(completeWorkouts).forEach((cId) => {
          completeWorkouts[cId].completeId = cId;
          workouts.push(completeWorkouts[cId]);
        });
      }
      resolve(workouts);
    })
    .catch((err) => reject(err));
});

const createCompletedWorkout = (newCompletedWorkout) => axios.post(`${baseUrl}/completedWorkouts.json`, newCompletedWorkout);

const deleteCompletedWorkout = (id) => axios.delete(`${baseUrl}/completedWorkouts/${id}.json`);

export default { createCompletedWorkout, getCompletedWorkoutsByUid, deleteCompletedWorkout };
