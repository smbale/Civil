import { Civil } from "../../src";

(async () => {
  const civil = new Civil();

  console.log("Deploying newsroom...");
  const newsroom = await (await civil.newsroomDeployTrusted()).awaitReceipt();
  console.log("Newsroom at: ", newsroom.address);

  console.log("Subscribing to new articles");
  const subscription = newsroom
    .proposedContent()
    .do((header) => console.log("\tProposed article, uri: " + header.uri))
    .flatMap(async (header) => newsroom.resolveContent(header))
    .subscribe((article) => {
      console.log("\tContent for article id: " + article.id, article.content);
      console.log("\tUnsubscribing");
      subscription.unsubscribe();
    });

  console.log("Am I the owner:", await newsroom.isOwner());

  console.log("Proposing a new article...");
  try {
    const id = await (await newsroom.proposeContent("This is example content that I want to post")).awaitReceipt();
    console.log("Article proposed: ", id);
  } catch (e) {
    console.error("Failed to propose article:", e);
  }
})()
.catch((err) => console.error(err));
