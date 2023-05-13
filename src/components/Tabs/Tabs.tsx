import { handleIsActive, tabs } from "../../app/stores/admin/tabStore"
import { useStore } from "@nanostores/react"
import type { IconType } from "react-icons/lib"
import React from "react"

export interface ITabs extends React.HTMLAttributes<HTMLDivElement> {
}

export interface ITab {
	pageTitle: string,
	page: JSX.Element,
	icon: IconType,
	active: boolean,
}

function Tabs(props: ITabs) {
	const $tabs = useStore(tabs);
	return (
		<div {...props}>
			<div className="tabs flex-nowrap overflow-scroll font-semibold bg-white lg:tab-lg lg:overflow-auto lg:w-full border-b-2">
				{$tabs.map((tab, $index) => (
					<Tab
						key={$index}
						active={tab.active}
						icon={tab.icon}
						index={$index}
						handleIsActive={handleIsActive}
					>
						{tab.pageTitle}
					</Tab>
				))}
			</div>

			{$tabs.map((tab, index) => (tab.active ? React.cloneElement(tab.page,{key: index}) : ""))}
		</div>

	)
}

export default Tabs

interface Tab {
	children: string,
	active?: boolean,
	icon: IconType,
	index: number,
	handleIsActive: (index: number) => void
}

export const Tab = ({ children, active = false, icon, index, handleIsActive }: Tab) => {
	return (
		<a
			className={`tab flex-1 lg:flex-initial min-w-fit gap-1 ${active ? 'tab-bordered tab-active' : ''}`}
			onClick={() => handleIsActive(index)}
		>
			{React.createElement(icon, { className: "text-xl" })}
			<span>{children}</span>
		</a>
	)
}

