import { deployNewsroom } from "../../scripts/deploy-newsroom";
import { apply } from "../../scripts/apply";
//import * as fs from "fs";
import { Civil } from "@joincivil/core";

export function setIndexListeners(): void {
  const deployButton = document.getElementById("param-deployNewsroom")!;
  deployButton.onclick = async (event) => {
    const newsroomAddress = await deployNewsroom();
    window.location.assign("/newsroom.html?address=" + newsroomAddress);
  };
}

export function setNewsroomListeners(): void {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const address = url.searchParams.get("address");

  const applyButton = document.getElementById("param-applyToTCR")!;
  applyButton.onclick = async (event) => {
    if (address) {
      const applyToTCR = await apply(address);
    } else {
      console.error("newsroom address not found in params");
    }
  };

  const proposeAndApproveButton = document.getElementById("param-proposeAndApprove")!;
  proposeAndApproveButton.onclick = async (event) => {
    // TODO(nickreynolds): fix fs
    // const article = fs.readFileSync("assets/article.md").toString();
    const article = "This is article.";
    if (address) {
      const civil = new Civil();
      console.log("Deploying newsroom");
      const deployedNewsroom = await civil.newsroomAtUntrusted(address);
      console.log("Proposing content");
      const articleId = await deployedNewsroom.proposeContent(article);
      console.log(`\tContent id: ${articleId}`);

      console.log("Approving content");
      console.debug(await deployedNewsroom.approveContent(articleId));
      console.log("Done");

      window.location.assign("/article.html?newsroomAddress=" + address + "&articleId=" + articleId);

    } else {
      console.error("newsroom address not found in params");
    }
  };
}