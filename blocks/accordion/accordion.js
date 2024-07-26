export default function decorate(block) {
	let accordionContent;

	[...block.children].forEach((row, index) => {
		if (index === 1) {
			accordionContent = row;
			row.classList.add("accordion-content");
		}
		if (index === 0) {
			row.classList.add("accordion-header");
			[...row.children].forEach((div, index) => {
				if (index === 1) {
					div.classList.add("accordion-button")
					div.children[0].addEventListener("click", () => {
						toggleAccordion(accordionContent, block);
					});
				}
			});
		}
	})
}

function toggleAccordion(accordionContent, block) {
	if (!accordionContent) {
		return
	}

	block.classList.toggle("opened");

	if (block.classList.contains("opened")) {
		accordionContent.style.height = `${accordionContent.scrollHeight}px`;
	} else {
		accordionContent.style.height = '0px';
	}
}