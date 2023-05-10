import { createStore } from "vuex";
import axios from "axios";
import router from "../router";
const store = createStore({
  state: {
    weatherData: null,
    searchHistory: [],
    now: new Date(),
    apiKey: import.meta.env.VITE_APP_API_KEY,
  },
  mutations: {
    SET_WEATHER_DATA(state, data) {
      state.weatherData = data;
    },
    addSearchToHistory(state, search) {
      if (!state.searchHistory.includes(search.toLowerCase())) {
        state.searchHistory.push(search);
      }
    },
     SET_NOW(state, now) {
      state.now = now
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async fetchCurrentLocationWeatherData({ commit, state }, { latitude, longitude }) {
      console.log(state)
      // const apiKey = "0272983c99007b9d9ed9729bb3b9351e";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${state.apiKey}&units=metric`;
  
      try {
        commit("SET_IS_LOADING", true);
        const response = await axios.get(url);
        commit("SET_WEATHER_DATA", response.data);
      } catch (error) {
        console.log(error);
        alert(error.message)
      } finally {
        commit("SET_IS_LOADING", false);
      }
    },
    async fetchWeatherData({ commit, state }, searchTerm) {
      // const apiKey = process.env.VUE_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${state.apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        console.log(response.data);
        commit("SET_WEATHER_DATA", response.data);
        router.push({ name: "result" });
      } catch (error) {
        console.log(error);
        alert(error.message)
      }
    },
    fetchSavedLocation({ commit }) {
      const savedLocation = localStorage.getItem("savedLocation");
      if (savedLocation) {
        commit("SET_WEATHER_DATA", JSON.parse(savedLocation));
      }
    },
    updateNow({ commit }) {
      setInterval(() => {
        commit('SET_NOW', new Date())
      }, 1000)
    }
  },
  getters: {
    formattedDateTime(state) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const dayOfWeek = daysOfWeek[state.now.getDay()]
      const dayOfMonth = state.now.getDate()
      const month = monthsOfYear[state.now.getMonth()]
      const year = state.now.getFullYear()
      const hours = state.now.getHours().toString().padStart(2, '0')
      const minutes = state.now.getMinutes().toString().padStart(2, '0')
      const formattedDateTime = `${hours}:${minutes}-${dayOfWeek}, ${dayOfMonth} ${month} ${year}`
      return formattedDateTime
    }
  }
});

export default store;
