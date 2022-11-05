// Generated with util/create-component.js
import React,{ useEffect,createRef } from "react";
import TreeMenu,{ TreeMenuItem,TreeMenuActions } from "./TreeMenu";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import _ from "lodash";

import { FaSignInAlt,FaSign,FaSignOutAlt, FaCog,FaCogs, FaInfo,FaTable, FaFolderOpen,FaFolder, FaChevronRight, FaStar, FaArchive } from "react-icons/fa";
// import * as DarkModeToggle from "https://googlechromelabs.github.io/dark-mode-toggle/src/dark-mode-toggle.mjs";

import tree from "./tree.json";
import pgtree from "./pgtree.json";

import { TreeMenuProps } from "./TreeMenu.types";

type MarkerProps = {
	color:string
};

const Badge : React.FC<MarkerProps> = ({ color }) => {

	const [counter,setCounter] = React.useState("Custom");
	useEffect(()=>{
		const tm = setInterval(()=>setCounter(new Date().toLocaleTimeString()),1000);
		return () => {
			clearInterval(tm);
		};
	});
	return (
		<div style={{
			// border:"1px solid white",
			minWidth:16,
			display:"flex",
			justifyContent:"center",
			alignItems:"center",
			borderRadius:10,
			backgroundColor:color || "red",
			color:"yellow",
			fontSize:13,
			padding:2,
		}}>
			{counter}
		</div>
	);
};

const ITEMS : TreeMenuItem[] = [
	{
		id:"heading",
		title:"Heading",
		info:"Horizontal reveal infos",
		unselectable:false,
		infoReveal:"horizontal",
		icon:<FaStar color="white" />,
		control:"Heading value",
		titleStyle:{
			color:"orange",
			fontWeight:"bolder"
		}
		// badge:<Badge color="red" />
	},
	{ 		
		id:"main",
		title:"TreeMenu",
		badge:"Info",
		info:"Vertical reveal infos",
		titleStyle:{
			color:"green",
			// lineHeight:1
		},
		infoStyle:{
			color:"red",
			fontSize:24,
			// lineHeight:.3,
		},
		infoReveal:"vertical",
		icon:<FaArchive />,
		childs:[
			{
				id:"home",
				title:"Regular Title with",
				info:"Custom infoStyle",
				// control:<input defaultValue="Input..." />,
				infoStyle:{
					fontSize:12,
				},
				infoClass:"heading",
				style:{
					// fontSize:24
				},
				unselectable:false,
			},
			{
				id:"node",
				icon:<FaInfo />,
				title:<Badge color="orange" />,
				info:"Item with custom title",
				infoReveal:"vertical",
				childs:[
					{ id:"n1",title:"Sub item 1" },
					{ id:"n2",title:"Sub item 2" }
				]
			},
			{
				id:"custom",
				icon:<FaTable />,
				title:"Custom info",
				info:<div><Badge color="blue" /></div>,
			},
			{
				id:"sub",
				title:"Static goup icons",
				info:"This is sub menu",
				infoReveal:"horizontal",
				disabled:false,
				unselectable:false,
				// collapsed:false,
				// icon:<Icon icon="add" />,
				childs:[
					{ id:"m1",title:"Sub menu 1",
						disabled:true,
						info:"(disabled)"
					},
					{ id:"m2",title:"Sub menu 2" },
					{ id:"m3",title:"Sub menu 3",
						childs:[
							{ id:"t1",title:"Nested 1" },
							{ id:"t2",title:"Nested 1" },
							{ id:"deep",title:"Going Deeper",
				
								childs:[
									{ id:"LAST",title:"Hello",icon:<FaInfo color="yellow" /> }
								] }
						]
					},
					{ id:"m4",title:"menu 4 " }
				]
			},
			{
				id:"set",
				title:"Settings",
				icon:<FaCogs />,
				childs:[{
					id:"opt",title:"Options",disabled:true
				},
				{ id:"m5",title:"Information" },
				{ id:"m6",title:"Profile" },
				{ id:"m7",title:"Bugs" },

				]
			},
		] },
	{ title:"EXIT APP",id:"exit",icon:<FaSignOutAlt /> }
];


const Tree = ({ treeID,items,...rest }:Partial<TreeMenuProps>)  => {
	const ref = createRef<TreeMenuActions>();

	const onClick = (id:string) => {
		const item = ref.current?.getItem(id);
	};

	const onToggle = (...args:any) => {
		// console.log(...args);
	};

	const renderIcon = (item:TreeMenuItem) => {
		if ( !item.childs?.length )
			return <FaArchive />; 
	};


	const renderGroupState = (item:TreeMenuItem) => {
		if ( rest.enableRotate )
			return <FaChevronRight />;
		return item.collapsed ? <FaFolder /> : <FaFolderOpen/>;
	};

	useEffect(()=>{
		console.log(rest);
		ref?.current?.rebuild(_.cloneDeep(items as TreeMenuItem[]));
		// ref?.current?.invalidate();
	},[rest]);

	return (
		<div style={{ display:"flex",flexDirection:"row" }}>
			<div style={{ minWidth:400 }}>
				<TreeMenu 
					ref={ref}
					treeID={treeID || ""}
					{...rest}
					items={_.cloneDeep(items as TreeMenuItem[])}
					renderIcon={renderIcon}
					renderGroupState={renderGroupState}
					onClick={onClick} 
					onToggle={onToggle}
				/>
			</div>
		</div>
	);
};

export default {
	title: "Demo",
	component:Tree,
	argTypes:{
		theme:{
			control:{ type:"select",options:["dark","light"] }
		},
		groupIconLeft:{ control:"boolean" },
		infoReveal:{
			control:{ type:"select",options:["always","horizontal","vertical"] }
		},
		enableRotate:{ control:"boolean" },
		badgeVisible:{ control:"boolean" },
		infoStyle:{
			control:{
				type:"object"
			},
			defaultValue:{ color:"red" }
		},
		titleStyle:{
			control:{
				type:"object"
			},
			defaultValue:{ fontSize:12 }
		},
		itemHeight:{
			control:{
				type:"number"
			},
			defaultValue:32
		},
		items:{
			table:{
				disable:true
			}
		},
		propertyGrid:{
			table:{
				disable:true,
			}
		}
	}
} as ComponentMeta<typeof Tree>;


const Template : ComponentStory<typeof Tree> = (args:Partial<TreeMenuProps>) => <Tree {...args} />; 

export const FolderTree = Template.bind({});

FolderTree.args = {
	treeID:"simple_tree",
	groupIconLeft:true,
	infoReveal:"vertical",
	enableRotate:false,
	items:tree,
	badgeVisible:true,
	propertyGrid:false,
	theme:"dark",
};

export const PropertyGrid = Template.bind({});

PropertyGrid.args = {
	treeID:"property_grid",
	groupIconLeft:true,
	infoReveal:"always",
	enableRotate:false,
	badgeVisible:true,
	propertyGrid:true,
	items:pgtree,
	theme:"dark",
};

/*
export const FolderTree = Template.bind({});

FolderTree.args = {
	id:"simple_tree_2",
	treeID:"tree_2",
	initialCollapsed:false,
	groupIconLeft:false,
};
*/
// FolderTree.args.defaultCollapsed = false;

/*
export const FullSample = ()  => {
	const ref = createRef<TreeMenuActions>();
	const renderMarker = ({ id,...rest }) => {
		if ( id === "sub" || id === "m3" || id === "LAST")
			return <Badge color="green" />;
		if ( id === "home" || id === "m2")
			return <Badge color="orange" />;
		if ( id === "n1" )
			return <button onClick={() => alert(rest.title)}>Menu</button>;
	};

	const onClick = (id:string) => {
		const item = ref.current?.getItem(id);
	};

	const onToggle = (...args:any) => {
		console.log(...args);
	};

	const renderGroupState = (item:TreeMenuItem) => {
		console.log(">>>",item);
		return item.collapsed ? <FaFolder /> : <FaFolderOpen/>;
	};
	const renderIcon = (item:TreeMenuItem) => {
		if ( item.childs )
			return <FaFolder style={{ marginRight:5 }} color="var(--item-group-icon)" />;
	};

	return (
		<div style={{ display:"flex",flexDirection:"row" }}>
			<div style={{ minWidth:400 }}>
				<TreeMenu 
					treeID="tree1"
					// propertyGrid
					classPrefix="test"
					initialCollapsed
					// theme="dark"
					enableRotate={true}
					// initialSelected="LAST"
					// ref={ref}
					items={tree as TreeMenuItem[]}
					renderGroupState={<FaChevronRight />}
					// renderIcon={renderIcon}
					// renderGroupState={renderGroupState}
					// renderBadge={renderMarker} 
					onClick={onClick} 
					onToggle={onToggle}
				/>
			</div>
		</div>
	);
};
*/
/*
			<div style={{ minWidth:400 }}>
				<TreeMenu 
					classPrefix="test"
					// initialCollapsed
					theme="light"
					enableRotate={true}
					// initialSelected="LAST"
					// ref={ref}
					items={ITEMS}
					renderGroupState={<FaChevronRight />}
					// renderIcon={renderIcon}
					//renderGroupState={renderGroupState}
					renderBadge={renderMarker} 
					onClick={onClick} 
					onToggle={onToggle}
				/>

*/
// export const WithBaz = WithBar;

// export const WithBaz = () => <TreeMenu foo="baz" />;
