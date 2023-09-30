function convertMonths(Month) {
    let a = Month.toString().length;
    if (a == 1) {
      return "0" + Month;
    } else {
      return Month;
    }
  }
  function convertDate(Date) {
    let b = Date.toString();
    if (b < 10) {
      return "0" + Date;
    } else {
      return Date;
    }
  }
  
  let a=0;
  
  const date = new Date();
  let CurrentDate =
    date.getFullYear() +
    "-" +
    convertMonths(date.getMonth()) +
    "-" +
    date.getDate();
  
  const ApiKey = "LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a";
  const inputdate = document.getElementById("search-input");
  const submit = document.getElementById("submit");
  const imageContainer = document.getElementById("current-image-container");
  const previousImage = document.getElementById("previous-image-container");
  const searchButton = document.getElementById("search-form");
  const searchHistory = document.getElementById("search-history");
  const previousHeading = document.getElementById("previous-History-heading");
  
  const arrDates = [];
  
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    var date = inputdate.value;
    // console.log(date)
    getImageOfTheDay(date);
  });
  
  async function getImageOfTheDay(date) {
    previousImage.innerHTML = "";
  
    console.log(date)
    const endpoint = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${ApiKey}`;
    const response = await fetch(endpoint);
    const result = await response.json();
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>NASA Picture Of The Day</h2>
        <div class="image-container">
          <img
          src="${result.hdurl}"
          alt="image"
          class="image"
        />
        </div>
        <div class="image-description">
          <p>${result.explanation}
            
          </p>
        </div>`;
    imageContainer.style.display = "none";
    previousImage.append(div);
    saveSearch();
    
  }
  
  async function getCurrentImageOfTheDay() {
    const endpoint = `https://api.nasa.gov/planetary/apod?date=${CurrentDate}&api_key=${ApiKey}`;
    const response = await fetch(endpoint);
    const result = await response.json();
    //   console.log(result);
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>NASA Picture Of The Day</h2>
        <div class="image-container">
          <img
          src="${result.hdurl}"
          alt="image"
          class="image"
        />
        </div>
        <div class="image-description">
          <p>${result.explanation}
            
          </p>
        </div>`;
  
    imageContainer.append(div);
  }
  getCurrentImageOfTheDay();
  
  function saveSearch() {
    const date = inputdate.value;
  
    arrDates.push(date);
    // console.log(arrDates);
    localStorage.setItem("Date", arrDates);
    addSearchToHistory();
  }
  async function addSearchToHistory() {
    const ans = localStorage.getItem("Date");
    const StringDate = ans.split(",");
    let previousDate = StringDate[StringDate.length - 1];
    const newDate = new Date(previousDate);
    const latestDate =
      newDate.getFullYear() +
      "-" +
      convertMonths(newDate.getMonth() + 1) +
      "-" +
      convertDate(newDate.getDate());
   console.log("latest date", latestDate)
   
    const div1 = document.createElement("div");
    div1.innerHTML = `<li><a href="#" onclick="getImageOfTheDay(${a})"> ${previousDate}</a></li>
      <br>`;
      // div1.addEventListener('click', getImageOfTheDay(latestDate2));
      // console.log(latestDate2)
  
    previousHeading.style.display = "block";
    searchHistory.style.display = "block";
    searchHistory.append(div1);
   
  }
  
  
  
  