/* eslint-disable no-mixed-spaces-and-tabs */
import React, {  useEffect, useMemo, useState, useImperativeHandle, useCallback, createRef } from "react";
import clsx from "clsx";
import { TreeMenuItem,TreeMenuProps,ItemProps,ItemRenderProps,TreeMenuItemType } from "./TreeMenu.types";
import  "./TreeMenu.less";

export { TreeMenuItem };

// type ItemIconProps = Pick<ItemRenderProps,"icon" | "renderIcon">;

const ItemIcon : React.FC<ItemRenderProps> = (props) => {
	const { icon,renderIcon } = props;
	const iconView = useMemo(()=>{
		if ( !icon && !renderIcon )
		    return null;
		return icon || (typeof renderIcon === "function" ? renderIcon(props) : renderIcon);
	},[icon,renderIcon]);
	return (
		<div className="icon">
			{iconView}
		</div>
	);
};

const ItemBadge : React.FC<ItemRenderProps> = (props) => {
	const { renderBadge,badge } = props;
	const badgeView = useMemo(()=>{
		if ( !badge && !renderBadge )
		    return null;
		return badge || (typeof renderBadge === "function" ? renderBadge(props) : renderBadge);
	},[badge,renderBadge]);
	return (
		<div className="marker">
			{badgeView}
		</div>
	);
};

const GroupState : React.FC<ItemRenderProps> = (props) => {
	const { hasChilds,renderGroupState,enableRotate,collapsed } = props;
	const state = useMemo(()=>{
		if ( !hasChilds || !renderGroupState )
			return null;
		return typeof renderGroupState === "function" ? renderGroupState(props) : renderGroupState;
	},[hasChilds,renderGroupState,enableRotate,collapsed]);

	return ( 
		<div className={clsx("folder",{ "enable-rotate":enableRotate })}>
			{state}
		</div>
	);
};

const ItemText : React.FC<ItemRenderProps> = (props) => {
	const { title,info,titleClass,infoClass,infoReveal = "none",titleStyle,infoStyle } = props;
	return (
		<div className="text">
			<div className={clsx("title",titleClass,infoReveal)} style={titleStyle}>
				{title}
			</div>
			{info && <div className={clsx("info",infoClass,infoReveal)} style={infoStyle}>
				{info}
			</div>}
		</div>
	);
};

type ResizableProps = {
	children:string | JSX.Element;
	treeID:string;
}

const Control : React.FC<ResizableProps> = ({ children,treeID }) => {
	const lastX = React.useRef<number>(0);
	const lastW = React.useRef<number>(0);
	const tree = React.useRef(document.getElementById(treeID));

	const onMouseDown = (ev) => {
		const val = document.getElementsByClassName("value");
		if  (!val.length )
			return; 
		const rc = val[0].getBoundingClientRect();
		lastX.current = ev.pageX;
		lastW.current = rc.left - 16;
		window.addEventListener("mousemove",onMove);
		window.addEventListener("mouseup",onStop);
		onMove(ev);
		ev.preventDefault();
	};
	const onMove = (ev) => {
		const delta = ev.pageX - lastX.current; 
		const newX = lastW.current + delta;
		const dir = (newX - lastW.current) >= 0;
		if ( (!dir && newX > 100) || (dir && newX < tree.current.clientWidth - 40) ) {
			const tree = document.getElementById(treeID); 
			tree.style.setProperty("--resizeX",`${newX}px`);				
			lastW.current = newX;
			lastX.current = ev.pageX;
		}
		ev.preventDefault();
	};

	const onStop = (ev) => {
		window.removeEventListener("mouseup",onStop);
		window.removeEventListener("mousemove",onMove);
		ev.preventDefault();
	};

	return (
		<div className="value" style={{ display:"flex",flexDirection:"row" }}>
			<div className="sizer"  onMouseDown={onMouseDown} />
			<div className="control">{children}</div>
		</div>
	);
};

const Item : React.FC<ItemRenderProps> = (props) => {
	const { 
		icon,
		hasChilds,
		disabled, 
		onClick,level = 0,
		style,
		control,
		propertyGrid,
		treeID,
		badgeVisible,
		groupIconLeft,
		classes = [] 
	} = props;

	const padding = icon && hasChilds ? 0 : 0;
	return (
		<div style={{ paddingLeft:`${(level*12)+padding}px`,...style }} 
			className={clsx("item",{ hasChilds,disabled },Array.from(classes))} onClick={() => onClick && onClick(props)}>
			<div className={clsx("content",{ hasChilds })} >
				{groupIconLeft && <GroupState {...props} />}
				<ItemIcon {...props} />
				<ItemText {...props} />
				{badgeVisible && <ItemBadge {...props} />}
			</div>
			{(propertyGrid || control) && !hasChilds && <Control treeID={treeID}>{control}</Control>}
			{groupIconLeft || <GroupState {...props} />}
		</div>
	);
}; 

export type TreeMenuActions = {
    enable:(id:string,disable?:boolean) => void;
    getItem:(id:string) => TreeMenuItem | null;
    collapse:(id:string,collapsed?:boolean) => void;
    select:(id:string) => void;
	invalidate:() => void;
	rebuild:(items:TreeMenuItem[]) => void;
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
		infoReveal = "always",
		initialCollapsed,
		initialSelected,
		titleStyle,
		infoStyle,
		classPrefix,
		enableRotate,
		propertyGrid,
		groupIconLeft,
		badgeVisible = true,
		treeID,
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
		select:selectItem,
		invalidate:() => setChanged(!changed),
		rebuild:(newItems) => setData(transform(Array.from(newItems)))
	}));

	const transform = (list:TreeMenuItemType[],level = 0,parent?:TreeMenuItemType) : TreeMenuItemType[] => {
		return list.map((item,index)=>{
			if ( parent )
				item.parent = parent;
			const { childs } = item;
			item.level = level;
			if ( !item.id )
				item.id = `id_${level}_${index}`;
			if ( item.info ) {				
				item.infoReveal = item.infoReveal || infoReveal || "always";
			}
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
			const commonProps : ItemRenderProps = {
				titleStyle,
				infoStyle,
				// override item's styles
				...item, 
				// add common props
				onClick:() => _onClick(item), 
				renderBadge,
				enableRotate,
				renderGroupState,
				renderIcon,
				badgeVisible,
				groupIconLeft,
				treeID,
				propertyGrid,
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
		if (!ref)
			return;
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
		<div className={clsx(classPrefix,theme,"tree-menu")} id={treeID} ref={setRef}>
			{menu}
		</div>
	);
});

TreeMenu.displayName = "TreeMenu";

export default TreeMenu;