import { State } from "./state";

export function createNode<T extends Node = Node>(
    props: CreateNodeProps | State<CreateNodeProps>
): T & { clear: () => void };

export type CreateNodeProps = Node | MiniElement | string | number | false | null | undefined;

export type TagName = keyof Mini.Elements;

export type MiniElement = Mini.Elements[TagName];

export type MiniNode = MiniChildren | State<MiniChildren> | MiniChildren[] | State<MiniChildren[]>;

export type MiniChildren =
    | MiniElement
    | MiniElement[]
    | Node
    | string | number | false | null | undefined
    | MiniChildren[]
    | State<any>;

export type MiniDataset = {
    [key: string]: string | number | undefined | State<string | number | undefined>;
} | State<{
    [key: string]: string | number | undefined | State<string | number | undefined>;
}>;

export declare namespace Mini {
    export interface Elements {
        "a": HTMLAnchorElement | SVGAElement;
    }
}
