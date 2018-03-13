import { Civil } from "@joincivil/core";
import * as marked from "marked";
import BN from "bignumber.js";

import { setIndexListeners } from "./listeners";

// Metamask is injected after full load
window.addEventListener("load", async () => {
  setIndexListeners();
});
