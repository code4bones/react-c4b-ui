// Generated with util/create-component.js
import React,{useEffect,createRef} from "react";
import TreeMenu,{TreeMenuItem,TreeMenuActions} from "./TreeMenu";

export default {
    title: "TreeMenu"
};

const ITEMS : TreeMenuItem[] = [
	{ id:"main",title:"Main Menu",
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
									{ id:"LAST",title:"HELLO"}
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



const Marker = () => {

	const [counter,setCounter] = React.useState(0);
	useEffect(()=>{
		const tm = setInterval(()=>setCounter(counter+1),1000);
		return () => {
			clearInterval(tm);
		};
	});
	return (
		<div>
			{counter}
		</div>
	);
};


export const WithBar = ()  => {
	const ref = createRef<TreeMenuActions>();
	const renderMarker = (id:string) => {
		if ( id === "sub" || id === "m3" || id === "LAST")
			return <Marker />;
		if ( id === "home" || id === "m2")
			return <Marker />;
	};

	const onClick = (id:string) => {
		const item = ref.current?.getItem(id);
		console.log("id",id,item);
		// nav("/test1");
		setTimeout(()=>{
			//ref?.current?.collapse("deep",false);
			// ref?.current?.select("LAST");
		},1000);
		//if ( item )
		//	ref?.current?.enableItem(item.id,!item.disabled);
	};

	const onToggle = (...args:any) => {
		console.log(...args);
	};

return (
  <div style={{maxWidth:400}}>
  <TreeMenu 
    // initialCollapsed
    initialSelected="LAST"
    ref={ref}
    items={ITEMS}
    // renderGroupIcon={<Icon icon="caret-right" />}
    renderBadge={renderMarker} 
    onClick={onClick} 
    onToggle={onToggle}
    />
    </div>
    )
}

export const WithBaz = WithBar;

// export const WithBaz = () => <TreeMenu foo="baz" />;
