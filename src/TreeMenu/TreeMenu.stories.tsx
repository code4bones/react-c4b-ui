// Generated with util/create-component.js
import React,{ useEffect,createRef } from "react";
import TreeMenu,{ TreeMenuItem,TreeMenuActions } from "./TreeMenu";
import { FaInfo,FaTable, FaFolderOpen,FaFolder, FaChevronRight } from "react-icons/fa";
// import * as DarkModeToggle from "https://googlechromelabs.github.io/dark-mode-toggle/src/dark-mode-toggle.mjs";


type MarkerProps = {
	color:string
};

const Badge : React.FC<MarkerProps> = ({ color }) => {

	const [counter,setCounter] = React.useState(0);
	useEffect(()=>{
		const tm = setInterval(()=>setCounter(counter+1),1000);
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
		info:"Tree menu sample",
		unselectable:true
	},
	{ 		
		id:"main",title:"Main Menu 1",
		childs:[
			{
				id:"home",
				title:"Home",
				info:"Welcome",
				infoClass:"heading",
				style:{
					// fontSize:24
				},
				unselectable:false,
				// icon:<Icon icon="array" />
			},
			{
				id:"node",
				icon:<FaInfo />,
				title:<div><Badge color="orange" /></div>,
				info:"Custom title",
				childs:[
					{ id:"n1",title:"Hello !" }
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
				title:"Sub menu 1",
				info:"This is sub menu",
				disabled:false,
				unselectable:false,
				// collapsed:false,
				// icon:<Icon icon="add" />,
				childs:[
					{ id:"m1",title:"sub menu 1",disabled:true,
					},
					{ id:"m2",title:"sub menu 2" },
					{ id:"m3",title:"sub menu 3",
						childs:[
							{ id:"t1",title:"title 3" },
							{ id:"t2",title:"title 4" },
							{ id:"deep",title:"DEEPER",
				
								childs:[
									{ id:"LAST",title:"HELLO" }
								] }
						]
					},
					{ id:"m4",title:"menu 4 " }
				]
			},
			{
				id:"set",
				title:"Settings",
				childs:[{
					id:"opt",title:"Options",disabled:true
				},
				{ id:"m5",title:"menu 322" },
				{ id:"m6",title:"menu 32 " },
				{ id:"m7",title:"menu 23e23e" },

				]
			},
			{
				id:"tes3t",
				title:"Exit"
			},
			{
				id:"set3",
				title:"Settings3",
				childs:[{
					id:"opt3",title:"Options",disabled:true
				},
				{ id:"m53",title:"menu 322" },
				{ id:"m63",title:"menu 32 " },
				{ id:"m73",title:"menu 23e23e" },
				]
			},
			{
				id:"tes3t1",
				title:"Exit"
			},
			{
				id:"set31",
				collapsed:false,
				title:"Settings31",
				childs:[{
					id:"opt331",title:"Options",disabled:true
				},
				{ id:"m531",title:"menu 322" },
				{ id:"m631",title:"menu 32 " },
				{ id:"m731",title:"menu 23e23e" },
				]
			},
		] },
	{ title:"EXIT APP",id:"exit" }
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
				theme="dark"
				enableRotate={true}
				initialSelected="LAST"
				ref={ref}
				items={ITEMS}
				renderGroupState={<FaChevronRight />}
				renderIcon={renderIcon}
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
