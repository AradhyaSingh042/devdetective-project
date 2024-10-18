const inputField = document.querySelector(".user-input");
const searchBtn = document.querySelector(".search-btn");

const errorMsg = document.querySelector("[data-errorMsg]");
const avatar = document.querySelector(".avatar");
const fullName = document.querySelector("[data-fullName]");
const joinDate = document.querySelector("[data-joinDate]");
const githubLink = document.querySelector(".github-link");
const bio = document.querySelector(".bio");
const repoCount = document.querySelector("[data-repoCount]");
const followerCount = document.querySelector("[data-followerCount]");
const followingCount = document.querySelector("[data-followingCount]");
const cityName = document.querySelector("[data-cityName]");
const blogLink = document.querySelector(".blog-link");
const twitterLink = document.querySelector(".twitter-link");
const companyLink = document.querySelector(".company-link");

const locationIcon = document.querySelector("[data-locationIcon]");
const blogIcon = document.querySelector("[data-blogIcon]");
const twitterIcon = document.querySelector("[data-twitterIcon]");
const companyIcon = document.querySelector("[data-companyIcon]");

//dark mode
const wrapper = document.querySelector(".wrapper");
const titleContainer = document.querySelector(".title-container");
const formContainer = document.querySelector(".form-container");
const userInfoContainer = document.querySelector(".user-info-container");
const themeContainer = document.querySelector(".theme-container");
const themeName = document.querySelector(".theme-name");
const themeIcon = document.querySelector(".theme-icon");
const followContainer = document.querySelector(".follow-container");
const socialContainer1 = document.querySelector(".social-container1");
const socialContainer2 = document.querySelector(".social-container2");

fetchUserData("torvalds");
let currentTheme = "light";

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputField.value !== "") {
    let username = inputField.value;
    fetchUserData(username);
  }
});

function calcDate(date) {
  const dateObj = new Date(date);
  let res = dateObj.toString().split(" ");
  res.shift();
  return res;
}

async function fetchUserData(username) {
  try {
    errorMsg.classList.remove("active");
    let resp = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: "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",
      },
    });
    let data = await resp.json();
    if (data?.message === "Not Found") {
      throw new Error("404 Not Found");
    }
    renderUserData(data);
  } catch (e) {
    errorMsg.classList.add("active");
  }
}

function renderUserData(userInfo) {
  //username
  fullName.textContent = userInfo?.name;
  //date
  let res = calcDate(userInfo?.created_at);
  let month = res[0];
  let day = res[1];
  let year = res[2];
  joinDate.textContent = `Joined ${day} ${month} ${year}`;
  githubLink.href = userInfo?.html_url;
  githubLink.textContent = `@${userInfo?.login}`;
  bio.textContent = userInfo?.bio;
  repoCount.textContent = userInfo?.public_repos;
  followerCount.textContent = userInfo?.followers;
  followingCount.textContent = userInfo?.following;
  cityName.textContent = renderEmptyData(
    userInfo?.location,
    cityName,
    locationIcon
  );
  blogLink.href = renderEmptyData(userInfo?.blog, blogLink, blogIcon);
  blogLink.textContent = renderEmptyData(userInfo?.blog, blogLink, blogIcon);
  twitterLink.href = renderEmptyData(
    `https://twitter.com/${userInfo?.twitter_username}`,
    twitterLink,
    twitterIcon
  );
  twitterLink.textContent = renderEmptyData(
    userInfo?.twitter_username,
    twitterLink,
    twitterIcon
  );
  companyLink.textContent = renderEmptyData(
    userInfo?.company,
    companyLink,
    companyIcon
  );
  //avatar
  avatar.src = userInfo?.avatar_url;
}

function renderEmptyData(data, element, icon) {
  if (data) {
    return data;
  } else {
    icon.style.opacity = 0.5;
    element.style.color = "#ACBAD0";
    return "Not Available";
  }
}

inputField.addEventListener("input", (e) => {
  errorMsg.classList.remove("active");
});

//dark mode
function switchTheme(theme) {
  themeName.textContent = theme;
  if (theme == "light") {
    wrapper.classList.add("dark");
    titleContainer.classList.add("dark");
    themeContainer.classList.add("dark");
    formContainer.classList.add("dark");
    userInfoContainer.classList.add("dark");
    inputField.classList.add("dark");
    themeIcon.src = `assets/images/sun-icon.svg`;
    bio.classList.add("dark");
    joinDate.classList.add("dark");
    followContainer.classList.add("dark");
    socialContainer1.classList.add("dark");
    socialContainer2.classList.add("dark");
    locationIcon.classList.add("dark");
    blogIcon.classList.add("dark");
    twitterIcon.classList.add("dark");
    companyIcon.classList.add("dark");
    currentTheme = "dark";
  }

  if (theme == "dark") {
    wrapper.classList.remove("dark");
    titleContainer.classList.remove("dark");
    themeContainer.classList.remove("dark");
    formContainer.classList.remove("dark");
    userInfoContainer.classList.remove("dark");
    inputField.classList.remove("dark");
    themeIcon.src = `assets/images/moon-icon.svg`;
    bio.classList.remove("dark");
    joinDate.classList.remove("dark");
    followContainer.classList.remove("dark");
    socialContainer1.classList.remove("dark");
    socialContainer2.classList.remove("dark");
    locationIcon.classList.remove("dark");
    blogIcon.classList.remove("dark");
    twitterIcon.classList.remove("dark");
    companyIcon.classList.remove("dark");
    currentTheme = "light";
  }
}

themeContainer.addEventListener("click", (e) => {
  switchTheme(currentTheme);
});
