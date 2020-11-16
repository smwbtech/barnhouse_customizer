const preloadedImages = [];

const options = {
	root: document.querySelector('body'),
	threshold: 0.3
};

/**
 * Callback for IntersectionObserver instance
 * @param {Object[]} entries - entries list
 * @param {Object} observer - IntersectionObserver instance
 * @param {Object[]} controlls - list of controlls
 */
function intersectionHandler(entries, observer, controlls) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			for (const item of controlls) {
				const { name, colors } = item;
				colors.forEach((color) => {
					if (color.name !== 'default') {
						const img = new Image();
						img.src = `/wp-content/themes/scandi/barnhouse/${name}/${name}_${color.name}.png`;
						img.addEventListener(
							'load',
							() => {
								preloadedImages.push(img);
							},
							{ once: true }
						);
					}
				});
			}
			observer.disconnect();
		}
	});
}

/**
 * Take selector and controlls list and preload
 * all images, when block intesect the viewport
 * @param {string} selector - css selector app container
 * @param {Object[]} controlls - list of controlls objects
 */
export function loadImagesOnItersection(selector, controlls) {
	if (window && window.IntersectionObserver) {
		const target = document.querySelector(selector);
		const observer = new IntersectionObserver(
			(entries, observer) =>
				intersectionHandler(entries, observer, controlls),
			options
		);
		observer.observe(target);
	} else {
		return false;
	}
}
