let scrollOffset;
const carouselItemContainer = document.createElement('div');
carouselItemContainer.className = 'carousel-item-container';

let leftButton;
let rightButton;

export default function decorate(block) {
	[...block.children].forEach((row, index) => {
		row.classList.add('carousel-container');
		[...row.children].forEach((div, index) => {
			if (div.querySelector('.icon-carrot')) {
				div.classList.add('carousel-button');
			} else {
				div.classList.add('carousel-item');
				carouselItemContainer.append(div);
			}
		});

		row.insertBefore(carouselItemContainer, row.children[1]);

		[...row.children].forEach((div, index) => {
			if (div.classList.contains('carousel-button')) {
				if (index === 0) {
					leftButton = div;
					div.classList.add('left');
					div.addEventListener('click', () => {
						const size = Number(carouselItemContainer.getAttribute('data-size'));
						if (!scrollOffset) {
							scrollOffset = block.querySelector(`.carousel-item:nth-child(${size + 1})`).getBoundingClientRect().left - carouselItemContainer.getBoundingClientRect().left;
						}
						scrollCarousel('left', scrollOffset ? scrollOffset : scrollOffset = block.querySelector('.carousel-item:nth-child(4)').getBoundingClientRect().left - carouselItemContainer.getBoundingClientRect().left);
					});
				}

				if (index === 2) {
					rightButton = div;
					div.classList.add('right');
					div.addEventListener('click', () => {
						const size = Number(carouselItemContainer.getAttribute('data-size'));
						if (!scrollOffset) {
							scrollOffset = block.querySelector(`.carousel-item:nth-child(${size + 1})`).getBoundingClientRect().left - carouselItemContainer.getBoundingClientRect().left;
						}
						scrollCarousel('right', scrollOffset ? scrollOffset : scrollOffset = block.querySelector('.carousel-item:nth-child(4)').getBoundingClientRect().left - carouselItemContainer.getBoundingClientRect().left);
					});
				}
			}
		});
	});

	[...carouselItemContainer.children].forEach((item, index) => {
		if (index <= 2) {
			item.classList.add("active");
		}
	});
	handleButtons();
	window.addEventListener("resize", debounce(function(event){
		handleCarouselSize(event.target.innerWidth);
	}));
	handleCarouselSize(window.innerWidth);
}

function scrollCarousel(direction, scrollOffset) {
	handleActiveItems(direction);
	handleButtons();

	if (direction === 'left') {
		carouselItemContainer.scrollBy({
			left: -scrollOffset,
			behavior: 'smooth',
		});
	} else if (direction === 'right') {
		carouselItemContainer.scrollBy({
			left: scrollOffset,
			behavior: 'smooth',
		});
	}
}

function handleActiveItems(direction) {
	const size = Number(carouselItemContainer.getAttribute('data-size'));
	if (direction === 'left') {
		const currentActiveItems = carouselItemContainer.querySelectorAll('.carousel-item.active');

		for (let i = 0; i < size; i++) {
			carouselItemContainer.querySelector(':nth-child(1 of .active)').previousElementSibling.classList.add('active');
		}
		currentActiveItems.forEach((item) => item.classList.remove('active'));
	} else if (direction === 'right') {
		const currentActiveItems = carouselItemContainer.querySelectorAll('.carousel-item.active');

		for (let i = 0; i < size; i++) {
			carouselItemContainer.querySelector(':nth-last-child(1 of .active)').nextElementSibling.classList.add('active');
		}
		currentActiveItems.forEach((item) => item.classList.remove('active'));
	}
}

function handleButtons() {
	leftButton.classList.remove('hidden');
	rightButton.classList.remove('hidden');

	if (carouselItemContainer.children[carouselItemContainer.children.length - 1].classList.contains('active')) {
		rightButton.classList.add('hidden');
	}
	if (carouselItemContainer.children[0].classList.contains('active')) {
		leftButton.classList.add('hidden');
	}
}

function handleCarouselSize(screenWidth) {
	if (screenWidth <= 900) {
		carouselItemContainer.setAttribute('data-size', '1');
	} else {
		carouselItemContainer.setAttribute('data-size', '3');
	}
}

function debounce(func){
	let timer;
	return function(event){
		if (timer) clearTimeout(timer);
		timer = setTimeout(func, 500, event);
	};
}