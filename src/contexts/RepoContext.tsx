/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createContext } from "react";
import {
  AutomergeUrl,
  DocHandle,
  isValidAutomergeUrl,
  Repo,
} from "@automerge/automerge-repo";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import {
  RepoContext as PrimitiveRepoContext,
  useDocument,
} from "@automerge/automerge-repo-react-hooks";
import { Chat } from "../types";
import { ChangeFn, Doc } from "@automerge/automerge";

const repo = new Repo({
  network: [new BroadcastChannelNetworkAdapter()],
  storage: new IndexedDBStorageAdapter(),
});

export interface RepoValue {
  chats: Chat[];
}

const rootDocUrl = `${document.location.hash.substr(1)}`;
let handle: DocHandle<RepoValue>;
if (isValidAutomergeUrl(rootDocUrl)) {
  handle = repo.find(rootDocUrl);
} else {
  handle = repo.create<RepoValue>();
  handle.change((d) => (d.chats = []));
}
//@ts-ignore
const docUrl = (document.location.hash = handle.url);
//@ts-ignore
window.handle = handle; // we'll use this later for experimentation

export const PrimitiveRepoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PrimitiveRepoContext.Provider value={repo}>
      {children}
    </PrimitiveRepoContext.Provider>
  );
};

interface RepoContextInterface {
  docUrl: AutomergeUrl;
  repo: Repo;
  doc: Doc<RepoValue> | undefined;
  changeDoc: (changeFn: ChangeFn<RepoValue>) => void;
}

export const RepoContext = createContext<RepoContextInterface>({
  docUrl,
  repo,
  doc: { chats: [] },
  changeDoc() {},
});

export const RepoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [doc, changeDoc] = useDocument<RepoValue>(docUrl);

  return (
    <RepoContext.Provider value={{ docUrl, repo, changeDoc, doc }}>
      {children}
    </RepoContext.Provider>
  );
};
