import { Civil } from "@joincivil/core";
import BN from "bignumber.js";
import { EthAddress } from "../../core/build/src/types";

export async function apply(address: EthAddress): Promise<void> {
    const civil = new Civil();

    console.log("Apply to TCR");
    const tcr = await civil.ownedAddressTCRWithAppealsAtUntrusted("0x5aba6b66d796f6f544d915b91c9150a3ec2e7f6a");
    console.log("tcr address: " + tcr.address);
    console.log("tcr : " + await tcr.isWhitelisted("0x56078dA599a095B42806B4037FB7F682ba0DcE52"));
    const { awaitReceipt } = await tcr.apply(address + "", new BN(1000, 10), "test");
    //const { awaitReceipt } = await tcr.deposit(address, new BN(1000, 10));
    const applyReceipt = await awaitReceipt;
    console.log("Applied to TCR");
}
