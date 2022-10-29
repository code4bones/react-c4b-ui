import React from "react";
import { TreeMenuItem, TreeMenuProps } from "./TreeMenu.types";
import "./TreeMenu.less";
export { TreeMenuItem };
export declare type TreeMenuActions = {
    enable: (id: string, disable?: boolean) => void;
    getItem: (id: string) => TreeMenuItem | null;
    collapse: (id: string, collapsed?: boolean) => void;
    select: (id: string) => void;
};
declare const TreeMenu: React.ForwardRefExoticComponent<TreeMenuProps & React.RefAttributes<TreeMenuActions>>;
export default TreeMenu;
