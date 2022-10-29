// Generated with util/create-component.js

export type ItemProps = {
    level?:number;
    title:string | React.ReactElement;
    info?:string | React.ReactElement;
    route?:string;
    titleClass?:string;
    infoClass?:string;
    style?:React.CSSProperties;
    infoStyle?:React.CSSProperties;
    classes?:Set<string>;
    disabled?:boolean;
    badge?:string | React.ReactElement;
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

export type RenderType = (item:MenuItem) => React.ReactElement | undefined | null; 

export type ItemRenderProps = {
    enableRotate?:boolean;
    renderBadge?:TreeMenuProps["renderBadge"];
    renderGroupState?:TreeMenuProps["renderGroupState"];
    renderIcon?:TreeMenuProps["renderIcon"];
    // renderItem?:TreeMenuProps["renderItem"];
} & ItemProps;

type Theme = "dark" | "light";

export interface TreeMenuProps {
    // item tree data
    items:TreeMenuItem[];
    // style scope
    theme?:Theme | string;
    // scope custom styling
    classPrefix?:string;
    // enable expand / collapse icon rotation
    enableRotate?:boolean;
    infoAlwaysVisible?:boolean;
    initialCollapsed?:boolean;
    initialSelected?:string;    
    // custom renders
    renderBadge?:RenderType;
    renderIcon?:RenderType | React.ReactElement | null;
    renderGroupState?:RenderType | React.ReactElement | null;
    onClick?:(id:string) => void;
    onToggle?:(id?:string,collapsed?:boolean) => void;
}
