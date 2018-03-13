import { Civil } from "@joincivil/core";
import BN from "bignumber.js";
import { EthAddress } from "../../core/build/src/types";

export async function apply(address: EthAddress): Promise<void> {
    const civil = new Civil();

    console.log("Apply to TCR");
    const tcr = await civil.ownedAddressTCRWithAppealsAtUntrusted("0xd8556d9975edee77c3f65e0f332143743477906f");
    const { awaitReceipt } = await tcr.apply(address, new BN(1000, 10), "test");
    const applyReceipt = await awaitReceipt;
    console.log("Applied to TCR");
}
