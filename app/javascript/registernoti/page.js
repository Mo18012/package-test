import { registerNotification } from "webtonative";
document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const iosBtn = document.getElementById("iosBtn");
  const androidBtn = document.getElementById("androidBtn");

  // detect platform
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  let platform = "unknown";
  if (/android/i.test(ua)) platform = "android";
  else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) platform = "ios";

  if (platform === "ios") iosBtn.style.display = "block";
  else if (platform === "android") androidBtn.style.display = "block";
  else output.innerText = "❌ Unknown platform.";

  // handlers
  iosBtn.onclick = function () {
    registerNotification({
      callback: (data) => {
        output.innerText =
          "📱 iOS callback JSON:\n" + JSON.stringify(data, null, 2);
      },
    });
  };

  androidBtn.onclick = function () {
    registerNotification({
      callback: (data) => {
        output.innerText =
          "🤖 Android callback JSON:\n" + JSON.stringify(data, null, 2);
      },
    });
  };
});
