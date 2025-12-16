import { Descriptions, Flex, Typography, Tag } from 'antd'
import { getMovie } from '../../utils/requests'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './MoviePage.css'

const MoviePage = () => {
	const { id } = useParams()
	const [movie, setMovie] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchMovieData = async () => {
			if (!id) {
				setError('ID фильма не указан')
				setLoading(false)
				return
			}

			try {
				setLoading(true)

				const response = await getMovie(id)
				if (response.data && response.data.status === 'success') {
					setMovie(response.data.data)
				}
			} catch (err) {
				console.error('Ошибка загрузки фильма:', err)
				setError('Не удалось загрузить информацию о фильме')
			} finally {
				setLoading(false)
			}
		}

		fetchMovieData()
	}, [id])

	if (loading) {
		return (
			<div className='movie-page loading'>
				<div className='loader'>Загрузка фильма...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='movie-page error'>
				<h2>Ошибка</h2>
				<p>{error}</p>
			</div>
		)
	}

	if (!movie) {
		return (
			<div className='movie-page not-found'>
				<h2>Фильм не найден</h2>
				<p>Попробуйте выбрать другой фильм</p>
			</div>
		)
	}

	const posterUrl = movie.poster
		? movie.poster.startsWith('http')
			? movie.poster
			: `http://${movie.poster}`
		: null

	const items = [
		{ label: 'год', children: movie.details.year },
		{
			label: 'режиссер',
			children: movie.details.director,
		},
		{
			label: 'сценарист',
			children: movie.details.screenwriter,
		},
		{
			label: 'жанр',
			children: (
				<>
					{movie.details.genres.map(genre => (
						<Tag color='#FF7A85' key={genre}>
							{genre}
						</Tag>
					))}
				</>
			),
		},
		{
			label: 'страна',
			children: movie.details.country,
		},
		{
			label: 'описание',
			children: movie.details.description,
			span: 3,
		},
	]

	return (
		<div id='movie-page'>
			<div className='content-movie-container'>
				<Flex gap={30} align='center'>
					<Typography.Title className='movie-title' level={4}>
						{movie.title.ru}
					</Typography.Title>
					<Typography.Title className='movie-title light' level={4}>
						{movie.title.en}
					</Typography.Title>
				</Flex>
			</div>
			<div className='content-movie-container'>
				<Flex gap={90}>
					{posterUrl ? (
						<img
							className='movie-img'
							src={posterUrl}
							onError={e => {
								e.target.src =
									'https://via.placeholder.com/300x450?text=No+Image'
								e.target.onerror = null
							}}
						/>
					) : (
						<div className='movie-img-placeholder'>Изображение отсутствует</div>
					)}
					<div className='movie-info-container'>
						<Flex></Flex>
						<Descriptions
							column={1}
							colon={false}
							title={'О фильме'}
							bordered
							items={items}
						></Descriptions>
					</div>
				</Flex>
			</div>
			<div className='content-movie-container'></div>
		</div>
	)
}

export default MoviePage
