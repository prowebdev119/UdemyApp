const fs = require("fs");

function readdirAsync(path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

readdirAsync("./data").then(async (data) => {
  const makefile = [];
  for (let i = 0; i < data.length; i++) {
    const file = await readdirAsync(`./data/${data[i]}/video`);
    const completed = [];
    for(let i = 1; i <= file.length; i=i+2) completed.push(false);

    makefile.push({
      video: file,
      name: data[i],
      status:completed
    });
  }
  fs.writeFileSync("./data.json", JSON.stringify(makefile));
});
