// Generated with util/create-component.js
import React,{ useEffect,createRef } from "react";
import TreeMenu,{ TreeMenuItem,TreeMenuActions } from "./TreeMenu";
import { FaSignInAlt,FaSign,FaSignOutAlt, FaCog,FaCogs, FaInfo,FaTable, FaFolderOpen,FaFolder, FaChevronRight, FaStar, FaArchive } from "react-icons/fa";
// import * as DarkModeToggle from "https://googlechromelabs.github.io/dark-mode-toggle/src/dark-mode-toggle.mjs";


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
		info:"TreeMenu sample",
		unselectable:false,
		icon:<FaStar color="white" />
		// badge:<Badge color="red" />
	},
	{ 		
		id:"main",
		title:"TreeMenu",
		icon:<FaArchive />,
		childs:[
			{
				id:"home",
				title:"Demo",
				info:"Welcome to TreeMenu",
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
				title:"Nested subs",
				info:"This is sub menu",
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


export default {
	title: "TreeMenu"
};




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
		return item.collapsed ? <FaFolder /> : <FaFolderOpen/>;
	};
	const renderIcon = (item:TreeMenuItem) => {
		if ( item.childs )
			return <FaFolder style={{ marginRight:5 }} color="var(--item-group-icon)" />;
	};

	return (
		<div style={{ maxWidth:400 }}>
			<TreeMenu 
				classPrefix="test"
				// initialCollapsed
				// theme="dark"
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
		</div>
	);
};

// export const WithBaz = WithBar;

// export const WithBaz = () => <TreeMenu foo="baz" />;
