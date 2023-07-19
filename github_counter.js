async function github_counter(repository = "gote-supporter", plus = 0, elementid = "github_counter") {
  let count = 0;
  const http = new XMLHttpRequest();
  http.open('GET', `https://api.github.com/repos/Gotemba912/${repository}/releases`);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      const json = JSON.parse(http.responseText);
      for (const release of json) {
        for (const asset of release.assets) {
          count = count + asset.download_count;
        }
      }
      count = count + plus;
      document.getElementById(elementid).textContent = count.toLocaleString();
    };
  };
  return;
};