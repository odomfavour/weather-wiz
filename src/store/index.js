import { createStore } from "vuex";
import axios from "axios";
import router from "../router";
const store = createStore({
  state: {
    weatherData: null,
    searchHistory: [],
    now: new Date(),
    apiKey: import.meta.env.VITE_APP_API_KEY,
    isError: null,
    errorMsg: null,
    alertMsg: null,
    savedLocations: null
  },
  mutations: {
    SET_WEATHER_DATA(state, data) {
      state.weatherData = data;
    },
    addSearchToHistory(state, search) {
      state.searchHistory = state.searchHistory || [];
      if (!state.searchHistory.includes(search.toLowerCase())) {
        state.searchHistory.push(search);
        localStorage.setItem('searchHistory', JSON.stringify(state.searchHistory))
      }

    },
    removeSearchFromHistory(state, search) {
        state.searchHistory = state.searchHistory.filter(
          entry => entry.toLowerCase() !== search.toLowerCase()
        );
        localStorage.setItem('searchHistory', JSON.stringify(state.searchHistory));
        state.searchHistory = [...state.searchHistory]; // Update the array reference
      
    },
    
    SET_NOW(state, now) {
      state.now = now;
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state, msg) {
      state.isError = true;
      state.alertMsg = "";
      state.errorMsg = msg;
    },
    SET_ALERT(state, msg) {
      state.isError = true;
      state.errorMsg = "";
      state.alertMsg = msg;
    },
    SET_MODAL(state) {
      state.isError = false;
      state.alertMsg =""
      state.errorMsg = ""
    },
  },
  actions: {
    async fetchCurrentLocationWeatherData(
      { commit, state },
      { latitude, longitude }
    ) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${state.apiKey}&units=metric`;

      try {
        commit("SET_IS_LOADING", true);
        const response = await axios.get(url);
        commit("SET_WEATHER_DATA", response.data);
      } catch (error) {
        console.log(error);
        let errorCode = error.response.status;
        let errMsg = "";
        if (errorCode === 404) {
          errMsg =
            "Your search does not exist. Seems you made a mistake. Check again";
        }
        commit("SET_ERROR", errMsg);
      } finally {
        commit("SET_IS_LOADING", false);
      }
    },
    async fetchWeatherData({ commit, state }, searchTerm) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${state.apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        commit("SET_WEATHER_DATA", response.data);
        router.push({ name: "result" });
      } catch (error) {
        console.log(error);
        let errorCode = error.response.status;
        let errMsg = "";
        if (errorCode === 404) {
          errMsg =
            "Your search does not exist. Seems you made a mistake. Check again";
        }
        commit("SET_ERROR", errMsg);
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
        commit("SET_NOW", new Date());
      }, 1000);
    },
  },
  getters: {
    formattedDateTime(state) {
      let setDate = Intl.DateTimeFormat('en-us', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true}).format(state.now)
      // const daysOfWeek = [
      //   "Sunday",
      //   "Monday",
      //   "Tuesday",
      //   "Wednesday",
      //   "Thursday",
      //   "Friday",
      //   "Saturday",
      // ];
      // const monthsOfYear = [
      //   "January",
      //   "February",
      //   "March",
      //   "April",
      //   "May",
      //   "June",
      //   "July",
      //   "August",
      //   "September",
      //   "October",
      //   "November",
      //   "December",
      // ];
      // const dayOfWeek = daysOfWeek[state.now.getDay()];
      // const dayOfMonth = state.now.getDate();
      // const month = monthsOfYear[state.now.getMonth()];
      // const year = state.now.getFullYear();

      // Extract the AM/PM indicator separately
let amPm = Intl.DateTimeFormat('en-us', {
  hour: 'numeric',
  hour12: true // Enable 12-hour format
}).formatToParts(state.now).find(part => part.type === 'dayPeriod').value;

      const hours = state.now.getHours().toString().padStart(2, "0");
      const minutes = state.now.getMinutes().toString().padStart(2, "0");
      // const formattedDateTime = `${hours}:${minutes}-${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
      const formattedDateTime = `${hours}:${minutes} ${amPm} - ${setDate}`;
      return formattedDateTime;
    },
    getHistories(state) {
      let parsedHistory = JSON.parse(localStorage.getItem('searchHistory'))
      state.searchHistory = parsedHistory
      return state.searchHistory
    }
  },
});

export default store;
