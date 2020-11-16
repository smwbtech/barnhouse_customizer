<style>
	.house-customizer-wrapper {
		max-width: 1200px;
		position: relative;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 15px 15px rgba(0, 0, 0, 0.04);
		& canvas {
			max-width: 100%;
			height: auto;
		}
	}

	/* Tablets */
	@media (width < 991px) {
		.house-customizer-wrapper {
			max-width: 95vw;
			width: 100%;
		}
	}

	/* Phones */
	@media (width < 768px) {
		.house-customizer-wrapper {
			position: relative;
		}
	}
</style>

<script>
	import { onMount } from 'svelte';
	import { controlls } from './lib/controlls_collection.js';
	import { drawImage } from './lib/draw_image.js';
	import { loadImagesOnItersection } from './lib/images_loading.js';
	import Controlls from './Controlls.svelte';

	let canvas;

	let customization = {
		walls: {
			color: 'default'
		},
		desk: {
			color: 'default'
		},
		brus: {
			color: 'default'
		},
		stairs: {
			color: 'default'
		},
		roof: {
			color: 'default'
		},
		windows: {
			color: 'default'
		},
		plumbs: {
			color: 'default'
		},
		drains: {
			color: 'default'
		}
	};

	function changeItemHandler(e) {
		const { name, color } = e.detail;
		const imageSrc = `/wp-content/themes/scandi/barnhouse/${name}/${name}_${color}.png`;
		customization[name].color = color;
		drawImage({ canvas, imageSrc });
	}

	onMount(() => {
		canvas = document.getElementById('house_customizer_canvas');
		drawImage({ canvas, imageSrc: '/wp-content/themes/scandi/barnhouse/house.jpg', setSize: true });
		loadImagesOnItersection('#house_customizer', controlls);
	});
</script>

<div class="house-customizer-wrapper">

	<!-- House image -->
	<canvas id="house_customizer_canvas"></canvas>
	<Controlls on:change-item="{changeItemHandler}" />
</div>
