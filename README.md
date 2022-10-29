### React Component Library - code4bones react UI

### Components
	
|   Component| Description   |
| ------------ | ------------ |
|  TreeMenu | Navigation Menu Tree   |


# react-c4b-ui


![](https://img.shields.io/github/downloads/code4bones/react-c4b-ui/v1/total) ![](https://img.shields.io/github/watchers/code4bones/react-c4b-ui) ![](https://img.shields.io/github/forks/code4bones/react-c4b-ui) ![](https://img.shields.io/github/tag/code4bones/react-c4b-ui) ![](https://img.shields.io/github/release/code4bones/react-c4b-ui) ![](https://img.shields.io/github/issues/code4bones/react-c4b-ui)

### Links

[Change log](https://github.com/code4bones/react-c4b-ui/wiki/Change-Log "Change log")

### System default / custom theme 

![sample](https://github.com/code4bones/react-c4b-ui/blob/b861d11fd4b7d948911b386531596ff803350a00/samples.png?raw=true "sample")


### Install


`$ yarn add @code4bones/react-c4b-ui`

#### Initial usage

```tsx

	const ITEMS :  TreeMenuItem[] = [{ ... }]

	const ref = createRef<TreeMenuActions>();


	<TreeMenu
    ref={ref}
    items={ITEMS}
    onClick={onClick} 
	/>

```

### Properties

| Propery name | Description                    | Signature
| ------------- | ------------------------------ | ---- |
| `items[]`      | tree menu items array       | `TreeMenuItem`[] |
| `re`      | handle to TreeMenu methods       | `TreeMenuActions` |
| `onClick`   |  item click handler     | onClick?:(item:TreeMenuItem) => void|
| `onToggle`   |  collapse  / expand     | onToggle?:(id?:string,collapsed?:boolean) => void;|
| `initialCollapsed`   |  initial tree state     | boolean |
| `initialSelected`   |  initial selected item     | item's `id` : string|
| `renderBadge`   |  item click handler     | (item:TreeMenuItem) => React.ReactElement|
| `renderIcon`   |  Left side element of item     | onClick?:(item:TreeMenuItem) => void|
| `renderGroupState`   | Group indicator     | onClick?:(item:TreeMenuItem) => void|
| `renderBadge`   |  Right side element of item      | onClick?:(item:TreeMenuItem) => void|
| `theme`   | theme override class name     | `dark`, `light`, custom name | 
| `classPrefix`   | container global prefix     | string |
| `enableRotate` | Rotate collapse / expand | boolean |


`TreeMenuItem`

```tsx
    id:string;
    title:string | React.ReactElement;
    info?:string | React.ReactElement;
    icon?:React.ReactElement;
    badge?:string | React.ReactElement;
    disabled?:boolean;
    unselectable?:boolean;
    titleClass?:string;
    infoClass?:string;
    style?:React.CSSProperties;
    infoStyle?:React.CSSProperties;

```

`TreeMenuActions` ( use `ref` )
```
    enable:(id:string,disable?:boolean) => void;
    getItem:(id:string) => TreeMenuItem | null;
    collapse:(id:string,collapsed?:boolean) => void;
    select:(id:string) => void;

```

### Sample

Sample available via storybook `yarn storybook`