window.addEventListener('DOMContentLoaded', () => {
	function showLoader(wrap) {
		const loader = document.querySelector(wrap)
		loader.classList.add('show')
		loader.classList.remove('hide')
	}

	function hideLoader(wrap) {
		const loader = document.querySelector(wrap)
		loader.classList.add('hide')
		loader.classList.remove('show')
	}

	function showError(wrap) {
		const error = document.querySelector(wrap)
		error.classList.add('show')
		error.classList.remove('hide')
	}

	function errorMessage(text) {
		return `Something went wrong ${text}`
	}

	async function getResource(url) {
		try {
			const req = await fetch(url)
			if (!req.ok) {
				throw new Error(req.statusText)
			}
			const data = await req.json()
			return data
		} catch (err) {
			console.log(`Something went wrong: ${err}`)
		}
	}

	// Games Card
	getResource('https://gaming-platform-me9t.onrender.com/gamesCard')
		.then(data => {
			showLoader('.games__card__wrapper .loader')
			data.forEach(card => {
				const divEl = document.createElement('div')
				divEl.innerHTML = `
						<img src=${card.src} alt=${card.title} />
						<h1 class='games__card__title'>${card.title}</h1>
				`
				document.querySelector('.games__card__wrapper').append(divEl)
			})
		})
		.catch(err => {
			console.log(errorMessage(err))
			hideLoader('.games__card__wrapper .loader')
			showError('.games__card__wrapper .error')
		})
		.finally(() => hideLoader('.games__card__wrapper .loader'))

	// Category Card
	getResource('https://gaming-platform-me9t.onrender.com/categoryCard')
		.then(data => {
			showLoader('.category__cards__wrapper .loader')
			data.forEach(card => {
				const divEl = document.createElement('div')
				divEl.classList.add('category__card')
				divEl.innerHTML = ` 
					<div class="category__card__img" loading='lazy'>
						<img src=${card.src} alt=${card.title} loading='lazy'>
					</div>
					<p class="category__card__title">${card.title}</p>
					<div>
						<img src="./icons/home/arrow.svg" alt="arrow icon" class='category__arrow__icon' loading='lazy'>
					</div>
			`

				document.querySelector('.category__cards__wrapper').append(divEl)
			})
		})
		.catch(err => {
			errorMessage(err)
			hideLoader('.category__cards__wrapper .loader')
			showError('.category__cards__wrapper .error')
		})
		.finally(() => hideLoader('.category__cards__wrapper .loader'))

	// Projects Card
	getResource('https://gaming-platform-me9t.onrender.com/projectsCard')
		.then(data => {
			showLoader('.projects__image .loader'),
				data.forEach(item => {
					const divEL = document.createElement('div')
					divEL.innerHTML = `
					<img src='${item.src}' alt='${item.alt}' loading='lazy'>
			`

					document.querySelector('.projects__image').append(divEL)
				})
		})
		.catch(err => {
			console.log(errorMessage(err))
			hideLoader('.projects__image .loader')
			showError('.projects__image .error')
		})
		.finally(() => hideLoader('.projects__image .loader'))

	// News Lettter Send Message Telegram BOT
	const form = document.querySelector('.email__input__wrap')
	const input = document.querySelector('#email__input')
	const telegramBotToken = '7782347573:AAHpMSbyG7d5A4ZTb9SByph3Yv2-QBerihU'
	const chatId = '5838754660'

	form.addEventListener('submit', e => {
		e.preventDefault()

		sendMessage(input.value)
	})

	async function sendMessage(object) {
		try {
			const req = fetch(
				`https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						chat_id: chatId,
						text: `New Email: ${input.value}`,
					}),
				}
			)
		} catch (err) {
			console.log(err)
		} finally {
			form.reset()
		}
	}

	// projectsCard
	getResource('https://gaming-platform-me9t.onrender.com/team')
		.then(data => {
			showLoader('.team__wrap .loader')
			data.forEach(card => {
				const divEl = document.createElement('div')
				divEl.classList.add('team__card')
				divEl.innerHTML = `
				<img src=${card.src} alt=${card.name}>
				<p class="team__name">${card.name}</p>
				<p>${card.job}</p>
			`
				document.querySelector('.team__wrap').append(divEl)
			})
		})
		.catch(err => {
			console.log(errorMessage(err))
			hideLoader('.team__wrap .loader')
			showError('.team__wrap .error')
		})
		.finally(() => hideLoader('.team__wrap .loader'))

	// Customers
	getResource('https://gaming-platform-me9t.onrender.com/customers')
		.then(data => {
			showLoader('.customer-cart .loader')
			data.forEach(user => {
				const cardEl = document.createElement('div')
				cardEl.classList.add('customer__card')
				cardEl.innerHTML = `
				<div class="customer__card__detail">
						<div class="customer__card__detail__data">
							<img src=${user.src} alt=${user.name}>

							<div>
								<h1 class="customer__card__name">${user.name}</h1>
								<p class="customer__card__country">${user.country}</p>
							</div>
						</div>

						<div class="customer__card__descr">
							<p>${user.star}</p>
							<img src="./img/services/star.svg" alt="star">
						</div>
					</div>

					<div>
						<p>${user.descr}</p>
					</div>
			`
				document.querySelector('.customer-cart').append(cardEl)
			})
		})
		.catch(err => {
			console.log(errorMessage(err))
			hideLoader('.customer-cart .loader')
			showError('.customer-cart .error')
		})
		.finally(() => hideLoader('.customer-cart .loader'))

	// Footer Copyright
	const getFullYear = new Date().getFullYear()
	document.querySelector('.copyright__year').textContent = getFullYear
})
