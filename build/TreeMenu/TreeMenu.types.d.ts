/// <reference types="react" />
export declare type ItemProps = {
    level?: number;
    title: string | React.ReactElement;
    info?: string | React.ReactElement;
    route?: string;
    titleClass?: string;
    infoClass?: string;
    style?: React.CSSProperties;
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
export declare type RenderType = (item: MenuItem) => React.ReactElement | undefined | null;
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
    renderIcon?: RenderType | React.ReactElement | null;
    renderGroupState?: RenderType | React.ReactElement | null;
    onClick?: (id: string) => void;
    onToggle?: (id?: string, collapsed?: boolean) => void;
}
export {};
