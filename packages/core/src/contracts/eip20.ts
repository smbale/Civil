import { BigNumber } from "bignumber.js";
import { Observable } from "rxjs";
import "@joincivil/utils";

import "rxjs/add/operator/distinctUntilChanged";
import { Bytes32, CivilTransactionReceipt, EthAddress } from "../types";
import { requireAccount } from "../utils/errors";
import { Web3Wrapper } from "../utils/web3wrapper";
import { BaseWrapper } from "./basewrapper";
import { EIP20Contract } from "./generated/eip20";

/**
 * EIP20 allows user to interface with token
 */
export class EIP20 extends BaseWrapper<EIP20Contract> {
  public static atUntrusted(web3wrapper: Web3Wrapper, address: EthAddress): EIP20 {
    const instance = EIP20Contract.atUntrusted(web3wrapper, address);
    return new EIP20(web3wrapper, instance);
  }

  private constructor(web3Wrapper: Web3Wrapper, instance: EIP20Contract) {
    super(web3Wrapper, instance);
  }

  /**
   * Contract Transactions
   */

  /**
   * Approve spender to spend certain amount of tokens on user's behalf
   * @param spender address to approve as spender of tokens
   * @param numTokens number of tokens to approve for spender to spend on user's behalf
   */
  public async approveSpender(
    spender: EthAddress,
    numTokens: BigNumber,
  ): Promise<CivilTransactionReceipt> {
    const txhash = await this.instance.approve.sendTransactionAsync(spender, numTokens);
    return this.web3Wrapper.awaitReceipt(txhash);
  }

  /**
   * Contract Getters
   */

  /**
   * Get number of approved tokens for spender
   * @param spender spender to check approved tokens for
   */
  public async getApprovedTokensForSpender(
    spender: EthAddress,
    tokenOwner?: EthAddress,
  ): Promise<BigNumber> {
    let who = tokenOwner;
    if (!who) {
      who = requireAccount(this.web3Wrapper);
    }
    return this.instance.allowance.callAsync(who, spender);
  }

  public async getBalance(
    address: EthAddress,
  ): Promise<BigNumber> {
    return this.instance.balanceOf.callAsync(address);
  }

}
