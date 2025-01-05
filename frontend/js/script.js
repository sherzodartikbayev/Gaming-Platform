window.addEventListener('DOMContentLoaded', () => {
	// Fetch
	async function getResource(url) {
		const responce = await fetch(url)
		return responce.json()
	}

	// Home Page Start

	// Games Card
	getResource('http://localhost:3000/api/gamesCard')
		.then(data => {
			data.forEach(card => {
				const divEl = document.createElement('div')
				divEl.classList.add('games_card')
				divEl.innerHTML = `
					<img src='${card.src}' alt='${card.title}' class='card__img'>
 					<p class="games__card__title card-title"> 
 						<span>
 							<img src="/frontend/icons/home/fire.svg" alt="fire icon" />
 						</span> 
 						${card.title}
 					</p>
				`

				document.querySelector('.games__card__wrapper').append(divEl)
			})
		})
		.catch(err => console.log(err))

	// Category Card
	getResource('http://localhost:3000/api/category')
		.then(data => {
			data.forEach(card => {
				const divEl = document.createElement('div')
				divEl.classList.add('category__card')
				divEl.innerHTML = ` 
					<div class="category__card__img">
						<img src=${card.src} alt=${card.title}>
					</div>
					<p class="category__card__title">${card.title}</p>
					<div>
						<img src="./icons/home/arrow.svg" alt="arrow icon" class='category__arrow__icon'>
					</div>
			`

				document.querySelector('.category__cards__wrapper').append(divEl)
			})
		})
		.catch(err => console.log(err))

	// Projects Card
	getResource('http://localhost:3000/api/projects').then(data =>
		data.forEach(item => {
			const divEL = document.createElement('div')
			divEL.innerHTML = `
					<img src='${item.src}' alt='${item.alt}'>
			`

			document.querySelector('.projects__image').append(divEL)
		})
	)

	// Footer Copyright
	const getFullYear = new Date().getFullYear()
	document.querySelector('.copyright__year').textContent = getFullYear
})
