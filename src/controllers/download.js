import Fs from "fs";
import Path from "path";
import Axios from "axios";

export async function get(req, res) {
  const url =
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";
  const currentPtah = __dirname;
  const path = Path.resolve("./", "files", "landscape.jpg");

  const response = await Axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });

  response.data.pipe(Fs.createWriteStream(path));

  await new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve();
    });

    response.data.on("error", (err) => {
      reject(err);
    });
  });

  return res.json();
}

export async function getTest(req, res) {
  const url =
    "https://test-compliance-files.s3.amazonaws.com/03e1add6-d366-4cff-8f8b-28dbbf8f2cd9?AWSAccessKeyId=AKIAWL4WXHSYURIW76FW&Expires=1661310637&Signature=FfQ2aFNS%2B1mwQ9K4B3Hew8rtCCo%3D&response-content-disposition=attachment%3B%20filename%3D%22converted%2520%281%29.doc%22";
  const currentPtah = __dirname;
  const path = Path.resolve("./", "files", "temp.doc");

  try {

    const writer = Fs.createWriteStream(path);
    const response = await Axios.get(url, { responseType: "stream" });

    await new Promise(function (resolve, reject) {
      response.data.pipe(writer);

      response.data.on("end", () => {
        resolve();
      });
    });

    return res.status(201).json("File download");
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
