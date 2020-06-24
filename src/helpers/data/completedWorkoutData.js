import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const createCompletedWorkout = (newCompletedWorkout) => axios.post(`${baseUrl}/completedWorkouts.json`, newCompletedWorkout);

export default { createCompletedWorkout };
