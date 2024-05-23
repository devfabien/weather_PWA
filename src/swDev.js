export default function swDev() {
  let swUrl = `./sw.js`;
  navigator.serviceWorker.register(swUrl).then((resp) => {
    console.warn("response", resp);
  });
}
