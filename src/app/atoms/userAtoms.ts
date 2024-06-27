import { FetchedVideoCommentType, FetchedVideoType } from "@/types/apiResponses.types";
import { atom } from "jotai";

export const userIdAtom = atom<string>("");
export const userVideosAtom = atom<FetchedVideoType[]>([]);
export const loadingUserVideosAtom = atom<boolean>(false);

export const selectedUserVideoAtom = atom<FetchedVideoType | null>(null);
export const selectedVideoCommentsAtom = atom<FetchedVideoCommentType[] | null>(null);