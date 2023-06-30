"use client"
import React from "react";
import { useNetwork } from "@components/hooks/Web";
import { ExclamationIcon } from '@heroicons/react/solid';
import Nftlist from "./list";
import { Nft, NftMeta } from "../../../types/nft";
import nfts from "../../../content/meta.json";
import { useListedNfts } from "@components/hooks/Web";
const NftList = () => {
    const {nfts}= useListedNfts();
    const { network } = useNetwork()
  return (
    <div>
      {" "}
      { network.isConnectedToNetwork ?
            <NftList /> :
            <div className="rounded-md bg-yellow-50 p-4 mt-10">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                    { network.isLoading ?
                      "Loading..." :
                      `Connect to ${network.targetNetwork}`
                    }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
    </div>
  );
};

export default NftList;
