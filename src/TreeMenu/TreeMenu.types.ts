// Generated with util/create-component.js

type InfoReveal = "always" | "vertical" | "horizontal";

export type ItemProps = {
    id:string;
    //
    title:string | React.ReactElement;
    info?:string | React.ReactElement;
    badge?:string | React.ReactElement;
    control?:string | JSX.Element;
    icon?:React.ReactElement;
    //
    infoReveal?:InfoReveal;
    disabled?:boolean;
    unselectable?:boolean;
    // classes
    titleClass?:string;
    infoClass?:string;
    // styles
    style?:React.CSSProperties;
    titleStyle?:React.CSSProperties;
    infoStyle?:React.CSSProperties;    
    // internal
    classes?:Set<string>;
    collapsed?:boolean;
    hasChilds?:boolean;
    onClick?:(item:ItemProps) => void; 
    level?:number;
    // todos
    route?:string;
}

export type MenuItem = Omit<ItemProps,"level" | "classes" | "onClick">;

export type TreeMenuItem = {
    childs?:TreeMenuItem[];
} & MenuItem;

export type TreeMenuItemType = {
    parent?:TreeMenuItemType;
    childs?:TreeMenuItemType[];
} & ItemProps;


export type RenderFn = (item:MenuItem) => React.ReactElement | undefined | null; 
export type RenderType = RenderFn | React.ReactElement; 

export type ItemRenderProps = {
    enableRotate?:boolean;
    propertyGrid?:boolean;
    badgeVisible?:boolean;
    treeID:string;
    groupIconLeft?:boolean;
    renderBadge?:RenderType;
    renderIcon?:RenderType; 
    renderGroupState?:RenderType;
} & ItemProps;

type Theme = "dark" | "light";

type CommonItemProps = Pick<ItemRenderProps,
    "infoStyle" | 
    "titleStyle" | 
    "infoReveal" | 
    "enableRotate" | 
    "badgeVisible" | 
    "groupIconLeft" |
    "renderBadge" |
    "renderIcon" |
    "renderGroupState" |
    "treeID" |
    "propertyGrid"
    > 

export type TreeMenuProps = {
    items:TreeMenuItem[];
    theme?:Theme | string;
    itemHeight?:number;
    // scope custom styling
    classPrefix?:string;
    initialCollapsed?:boolean;
    initialSelected?:string;    
    onClick?:(id:string) => void;
    onToggle?:(id?:string,collapsed?:boolean) => void;
} & CommonItemProps;
