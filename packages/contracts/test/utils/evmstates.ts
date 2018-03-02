import * as Web3 from "web3";
import { rpc } from "@joincivil/utils";

// TODO(ritave): detect if on ganache or not, and replay state before each test if no snapshots
export function pushState(context: () => void) {
  let snapshotId: number;

  describe("while pushing state", () => {
    beforeEach(async () => {
      snapshotId = await snapshot();
    });
    
    describe("with pushed state", context);

    afterEach(async () => {
      await revert(snapshotId);
    });
  });
}

export async function snapshot(): Promise<number> {
  return (await rpc(web3.currentProvider, "evm_snapshot")).result;
}

export async function revert(whichSnapshot: number) {
  await rpc(web3.currentProvider, "evm_revert", [whichSnapshot]);
}
