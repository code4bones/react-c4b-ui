/// <reference types="react" />
declare type InfoReveal = "none" | "vertical" | "horizontal";
export declare type ItemProps = {
    level?: number;
    title: string | React.ReactElement;
    info?: string | React.ReactElement;
    infoReveal?: InfoReveal;
    route?: string;
    titleClass?: string;
    infoClass?: string;
    style?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    infoStyle?: React.CSSProperties;
    classes?: Set<string>;
    disabled?: boolean;
    badge?: string | React.ReactElement;
    id: string;
    collapsed?: boolean;
    unselectable?: boolean;
    hasChilds?: boolean;
    icon?: React.ReactElement;
    onClick?: (item: ItemProps) => void;
};
export declare type MenuItem = Omit<ItemProps, "level" | "classes" | "hasChilds" | "onClick">;
export declare type TreeMenuItem = {
    childs?: TreeMenuItem[];
} & MenuItem;
export declare type TreeMenuItemType = {
    parent?: TreeMenuItemType;
    childs?: TreeMenuItemType[];
} & ItemProps;
export declare type RenderFn = (item: MenuItem) => React.ReactElement | undefined | null;
export declare type RenderType = RenderFn | React.ReactElement;
export declare type ItemRenderProps = {
    enableRotate?: boolean;
    renderBadge?: TreeMenuProps["renderBadge"];
    renderGroupState?: TreeMenuProps["renderGroupState"];
    renderIcon?: TreeMenuProps["renderIcon"];
} & ItemProps;
declare type Theme = "dark" | "light";
export interface TreeMenuProps {
    items: TreeMenuItem[];
    theme?: Theme | string;
    classPrefix?: string;
    enableRotate?: boolean;
    infoAlwaysVisible?: boolean;
    initialCollapsed?: boolean;
    initialSelected?: string;
    renderBadge?: RenderType;
    renderIcon?: RenderType;
    renderGroupState?: RenderType;
    onClick?: (id: string) => void;
    onToggle?: (id?: string, collapsed?: boolean) => void;
}
export {};
