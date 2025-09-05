import { State } from "./state";

export function createNode<T extends Node = Node>(props: MiniNode): T;

export type MiniNode =
    | MiniElement
    | Node
    | string
    | number
    | false
    | null
    | undefined
    | MiniNode[]
    | State<MiniNode>;

type TagName = keyof Mini.Elements;

type MiniElement = Mini.Elements[TagName];

type MiniDataset = {
    [key: string]: string | number | undefined | State<string | number | undefined>;
} | State<{
    [key: string]: string | number | undefined | State<string | number | undefined>;
}>;

export declare namespace Mini {
    export interface Elements {
        "a": HTMLAnchorElement | SVGAElement;
    }
}
