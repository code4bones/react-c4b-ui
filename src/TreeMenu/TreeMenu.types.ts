// Generated with util/create-component.js

export type ItemProps = {
    level?:number;
    title:string;
    info?:string;
    route?:string;
    titleClass?:string;
    infoClass?:string;
    style?:React.CSSProperties;
    infoStyle?:React.CSSProperties;
    classes?:Set<string>;
    disabled?:boolean;
    id:string;
    collapsed?:boolean;
    unselectable?:boolean;
    hasChilds?:boolean;
    icon?:React.ReactElement;
    onClick?:(item:ItemProps) => void; 
}

export type MenuItem = Omit<ItemProps,"level" | "classes" | "hasChilds" | "onClick">;

export type TreeMenuItem = {
    childs?:TreeMenuItem[];
} & MenuItem;

export type TreeMenuItemType = {
    parent?:TreeMenuItemType;
    childs?:TreeMenuItemType[];
} & ItemProps;

export type RenderType = (id:string) => React.ReactElement | undefined | null; 

export type ItemRenderProps = {
    renderBadge?:TreeMenuProps["renderBadge"];
    renderGroup?:TreeMenuProps["renderGroupIcon"];
} & ItemProps;

type Theme = "dark" | "light"

export interface TreeMenuProps {
    // item tree data
    items:TreeMenuItem[];
    // style scope
    theme?:Theme;
    classPrefix?:string;
    initialCollapsed?:boolean;
    initialSelected?:string;    
    renderBadge?:RenderType;
    renderGroupIcon?:RenderType | React.ReactElement | null;
    onClick?:(id:string) => void;
    onToggle?:(id?:string,collapsed?:boolean) => void;
}
