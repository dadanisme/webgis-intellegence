export const getSnap = () => {
  const script = document.createElement("script");
  script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
  script.type = "text/javascript";
  script.setAttribute("data-client-key", "SB-Mid-client-84PD1yfgn32Vwa-z");

  // insert the script tag to head
  document.head.appendChild(script);
};
