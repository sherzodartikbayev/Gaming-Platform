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
	getResource('http://localhost:3000/api/gamesCard')
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
	getResource('http://localhost:3000/api/category')
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
	getResource('http://localhost:3000/api/projects')
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

	// Footer Copyright
	const getFullYear = new Date().getFullYear()
	document.querySelector('.copyright__year').textContent = getFullYear
})
