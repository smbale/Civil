import * as Web3 from "web3";

import { promisify } from "./language";

export function rpc(provider: Web3.Provider, method: string, params?: any[]): Promise<Web3.JSONRPCResponsePayload> {
  const req: any = {
    jsonrpc: "2.0",
    method,
    id: new Date().getTime()
  };
  if (params) {
    req.params = params;
  }

  return new Promise((resolve, reject) => {
    provider.sendAsync(
      req,
      (err, result: any) => {
        if (err) {
          return reject(err);
        }
        if (result.error != null) {
          return reject(new Error("RPC Error: " + (result.error.message || result.error)));
        }
        resolve(result as Web3.JSONRPCResponsePayload);
      }
    );
  });
}
