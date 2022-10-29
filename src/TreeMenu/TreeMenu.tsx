/* eslint-disable no-mixed-spaces-and-tabs */
import React, {  useEffect, useMemo, useState, useImperativeHandle } from "react";
import clsx from "clsx";
import { TreeMenuItem,TreeMenuProps,ItemProps,ItemRenderProps,TreeMenuItemType } from "./TreeMenu.types";
import "./TreeMenu.less";

export { TreeMenuItem };

const Item : React.FC<ItemRenderProps> = (props) => {
	const { 
		id,
		titleClass,
		infoClass,
		enableRotate,
		icon,info,
		renderBadge,
		renderGroupState,
		renderIcon, 
		hasChilds,disabled, onClick,level = 0,
		style,classes = [] } = props;
	const padding = icon && hasChilds ? 3 : 0;
	return (
		<div style={{ paddingLeft:`${(level*12)+padding}px`,...style }} 
			className={clsx("item",{ hasChilds,disabled },Array.from(classes))} onClick={() => onClick && onClick(props)}>
			<div className="content">
				{icon && <div className="icon">{icon}</div>}
				{renderIcon && 
                <div className="icon">
                	{typeof renderIcon === "function" ? renderIcon(props) : renderIcon}
                </div>}    
				<div className={clsx("title",titleClass)}>
					{props.title}
					{info && <div className={clsx("info",infoClass)}>
						{info}
					</div>}
				</div>
				{renderBadge && <div className="marker">
					{renderBadge(props)}
				</div>}
				{hasChilds && renderGroupState && 
                <div className={clsx("folder",{ "enable-rotate":enableRotate })}>
                	{typeof renderGroupState === "function" ? renderGroupState(props) : renderGroupState}
                </div>}    
			</div>
		</div>
	);
}; 

export type TreeMenuActions = {
    enable:(id:string,disable?:boolean) => void;
    getItem:(id:string) => TreeMenuItem | null;
    collapse:(id:string,collapsed?:boolean) => void;
    select:(id:string) => void;
}

const TreeMenu = React.forwardRef<TreeMenuActions,TreeMenuProps>((props,ref) => {
	// eslint-disable-next-line react/prop-types
	const { 
		items,
		renderBadge,
		renderGroupState,
		renderIcon,
		onClick,
		onToggle,
		initialCollapsed,
		initialSelected,
		classPrefix,
		enableRotate,
		theme
	} = props;
	const [data,setData] = useState<TreeMenuItemType[]>([]);
	const [selected,setSelected] = useState<ItemProps>();
	const [changed,setChanged] = useState(false);
	const [once,setOnce] = useState(false);

	const getItem = (id:string) => {
		let found : TreeMenuItem | null = null;
		const iterate = (list?:TreeMenuItem[]) : TreeMenuItem | null => {
			if ( !list )
				return null;
			for (const item of list) {
				found = item.id === id ? item : iterate(item?.childs);
				if ( found )
					return found;
			}
			return found;
		};
		return iterate(data) as TreeMenuItemType;
	};

	const processParents = (start : TreeMenuItemType,cb : (item:TreeMenuItemType) => void) =>{
		if ( !start?.parent )
			return;
		processParents(start?.parent,cb);
		cb(start.parent);
	};

	const iteratateItems = (list:TreeMenuItemType[],cb : (item:TreeMenuItemType) => void) => {
		list?.forEach((item)=>{
			cb(item);            
			if ( item.childs?.length )
				iteratateItems(item.childs,cb);            
		});
	};

	const enableItem = (id:string,disable?:boolean) => {
		const item = getItem(id);
		if ( item )
			item.disabled = disable;
		setChanged(!changed);
	};

	const collapse = (id:string,collapsed?:boolean) => {
		const item = getItem(id);

		processParents(item,(parent)=>{
			parent.collapsed = false;
			setCollapse(parent);
		});
		item.collapsed = collapsed;
		setCollapse(item);
		setChanged(!changed);
	};

	const selectItem = (id:string) => {
		const item = getItem(id);
		if ( selected )
			selected.classes?.delete("selected");
		processParents(item,(parent)=>{
			parent.collapsed = false;
			setCollapse(parent);
		});
		item.classes?.add("selected");
		setSelected(item);
	};

	// methods for parent
	useImperativeHandle(ref,()=>({
		enable:enableItem,
		getItem,
		collapse,
		select:selectItem
	}));

	const transform = (list:TreeMenuItemType[],level = 0,parent?:TreeMenuItemType) : TreeMenuItemType[] => {
		return list.map((item)=>{
			if ( parent )
				item.parent = parent;
			const { childs } = item;
			item.level = level;
			if ( childs ) {
				item.hasChilds = true;
				item.classes = new Set(["expanded"]);
				item.childs = transform(childs,level+1,item);
			} else {
				item.classes = new Set();
			}
			return item;
		});
	};

	useEffect(()=>{
		setData(transform(items));
	},[items]);

	const setCollapse = (item:ItemProps) => {
		if ( item.collapsed ) {
			item.classes?.add("collapsed");
			item.classes?.delete("expanded");
		} else {
			item.classes?.delete("collapsed");
			item.classes?.add("expanded");
		}
	};

	const _onClick = (item:ItemProps) => {
		let update = false;

		if ( selected && !(item.unselectable) ) {
			selected.classes?.delete("selected");
		}
		if ( item.hasChilds ) {
			item.collapsed = !item.collapsed;
			setCollapse(item);
			if ( onToggle )
				onToggle(item.id,item.classes?.has("collapsed"));
			update = true;
		}
		if(!item.unselectable) {
			item.classes?.add("selected");
			setSelected(item);
		} else {
			update = true;
		}
		if ( update )
			setChanged(!changed);
		if ( onClick )
			onClick(item.id);
	};
	const render = (list:TreeMenuItemType[]) => {
		const onRef = (r:HTMLDivElement) => {
			// set initial max-height to element height to fix sliding menu time gap ( max-height: 1000 is to much ! -:) ))
			if ( r && !r.style.getPropertyValue("--mh") ) {
				const height = r.clientHeight;
				r.style.setProperty("--mh",`${height}px`);
			}
		};
		const view = list.map((item,index)=>{
			const { childs } = item;
			const commonProps = {
				...item, 
				onClick:() => _onClick(item), 
				renderBadge,
				enableRotate,
				renderGroupState,
				renderIcon,
			};
			if ( childs ) {
				return (
					<div ref={onRef} key={index} className="wrapper">
						<Item key={item.id} disabled={false} {...commonProps} />
						<div ref={onRef} className={clsx("group",{ disabled:item.disabled })} id={`group_${item.id}`}>
							{render(childs)}
						</div>
					</div>
				);
			}
			return (<Item key={item.id} {...commonProps} />);
		});
		return <div className="group">{view}</div>;
	};

	const menu = useMemo(()=>{
		return render(data);
	},[data,selected,changed]);

	const setRef = (ref:HTMLDivElement) => {
		// handle first render, to process initial states
		if (!once && ref?.clientHeight > 0 ) {
			setOnce(true); // only once ( need to handle "resize" to reset ???? )
			iteratateItems(data,(item)=>{
				if ( !("collapsed" in item) )
					item.collapsed = item.collapsed || initialCollapsed;
				setCollapse(item);
			});
			if ( initialSelected ) {
				// will trigger rerender
				selectItem(initialSelected);
			} else  // trigger rerender
				setChanged(!changed);
		}
	};

	return (
		<div className={clsx(classPrefix,theme,"tree-menu")} ref={setRef}>
			{menu}
		</div>
	);
});

TreeMenu.displayName = "TreeMenu";

export default TreeMenu;