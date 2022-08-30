import Fs from "fs";
import Path from "path";
import Axios from "axios";
import {
  convertWordFiles,
  convertToBase64,
  convertWordFileToHTML,
} from "convert-multiple-files";
var docxConverter = require("docx-pdf");

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
    "https://test-compliance-files.s3.amazonaws.com/03e1add6-d366-4cff-8f8b-28dbbf8f2cd9?AWSAccessKeyId=AKIAWL4WXHSYURIW76FW&Expires=1661364592&Signature=uexMDGok9t1DMgPv1HznUH9cmSs%3D&response-content-disposition=attachment%3B%20filename%3D%22converted%2520%281%29.doc%22";

  const currentPtah = __dirname;
  const path = Path.resolve("./", "files", "TEST.docx");

  //const fileIsDownload = await this.getFile(url, path);
  await convertToPDF();
  return res.status(200).json("File download");
}

const url =
"https://test-compliance-files.s3.amazonaws.com/03e1add6-d366-4cff-8f8b-28dbbf8f2cd9?AWSAccessKeyId=AKIAWL4WXHSYURIW76FW&Expires=1661364592&Signature=uexMDGok9t1DMgPv1HznUH9cmSs%3D&response-content-disposition=attachment%3B%20filename%3D%22converted%2520%281%29.doc%22";
const path = '/app/user/file'

async function getFile(url, path) {
  try {
   
    const response = await Axios.get(url, { responseType: "stream" });

    await new Promise(function (resolve, reject) {
      const writer = Fs.createWriteStream(path);
      response.data.pipe(writer);

      response.data.on("end", () => {
        resolve();
      });

      writer.on("error", (err) => {
        reject(err);
      });
    });

    // return res.status(201).json("File download");
    return true;
  } catch (error) {
    //return res.status(500).json(error.message);
    return false;
  }
}

const convertToPDF = async () => {

  const pathOrogon = Path.resolve("./", "files", "temp.doc");
  const pathResult = Path.resolve("./", "files", "outputDoc.pdf");
  const pathPdf = await convertWordFiles(pathOrogon, 'pdf', pathResult);
  console.log(pathPdf);

  const base64 = await convertToBase64(path);
  console.log(base64);
};

const docxConverterToPdf = async () => {
  await new Promise(function (resolve, reject) {
    const pathOrogon = Path.resolve("./", "files", "temp.doc");
    const pathResult = Path.resolve("./", "files", "outputDoc.pdf");
    docxConverter(pathOrogon, pathResult, function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log("result" + result);
      resolve();
    });
  });
};
