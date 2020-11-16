<style>
	.house-customizer-controlls__item {
		position: relative;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		margin: 0 1.5em;

		&.active {
			& img {
				border: 3px solid #eabe47;
				transform: scale(1.05);
			}
		}

		&:hover {
			& img {
				border: 3px solid #eabe47;
			}
		}

		& img {
			width: 70px;
			height: 70px;
			border: 3px solid #ffd86f;
			border-radius: 50%;
			overflow: hidden;
			box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
			cursor: pointer;
			transform: scale(1);
			transition: transform 0.2s ease-in, border 0.2s ease-in;
		}

		& .color-marker {
			width: 35px;
			height: 35px;
			border-radius: 50%;
			border: 1px solid #ffd86f;
			position: absolute;
			left: -5px;
			top: -5px;
			box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
		}
	}

	@media (width < 768px) {
		.house-customizer-controlls__item {
			position: static;
			margin: 0px;
			margin-right: 2em;
			min-width: 50px;
			min-height: 50px;

			& img {
				width: 50px;
				height: 50px;
			}

			& .description {
				position: relative;
				min-width: 60px;
				text-align: center;

				& .color-marker {
					top: -60px;
					left: -5px;
				}
			}
		}
	}
</style>

<script>
	import { createEventDispatcher } from 'svelte';
	import ColorMenu from './ColorMenu.svelte';

	export let title;
	export let name;
	export let colors;
	export let index;
	export let submenuIndex;

	const dispatch = createEventDispatcher();
	const src = `/wp-content/themes/scandi/barnhouse/${name}_preview.jpg`;
	const alt = `выбор цвета ${name}`;

	let isSubmenuOpen = false;
	let activeColorIndex = 0;

	$: show = isSubmenuOpen && submenuIndex === index;

	$: capitalizedTitle = `${title.slice(0, 1).toUpperCase()}${title.slice(1)}`;
	// Watch for index changes
	$: if (submenuIndex !== index) {
		isSubmenuOpen = false;
	}

	$: markerStyle = `background-color: ${colors[activeColorIndex].hex};`;

	/**
        Toggle submenu status and dispatch
        'change-submenu' event with index of
        current component
        @param {object} e - click event object
        @returns {undefined}
    */
	function clickHandler(e) {
		isSubmenuOpen = !isSubmenuOpen;
		dispatch('change-submenu', {
			index: isSubmenuOpen ? index : null
		});
	}

	function changeItemHandler(e) {
		const { colorIndex } = e.detail;
		activeColorIndex = colorIndex;
		dispatch('change-item', {
			...e.detail
		});
	}
</script>

<li
	class="house-customizer-controlls__item"
	class:active="{submenuIndex === index}"
	on:click="{clickHandler}"
>
	<img {src} {alt} />
	<span class="description">
		{capitalizedTitle}
		<span class="color-marker" style="{markerStyle}"></span>
	</span>

	{#if show}
		<ColorMenu
			{colors}
			{name}
			{activeColorIndex}
			on:change-item="{changeItemHandler}"
		/>
	{/if}
</li>
