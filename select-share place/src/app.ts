import axios from 'axios';

const form = document.querySelector('form')!;
const adressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs';

type GoogleGeocodingResponse = {
	results: { geometry: { location: { lat: number; lng: number } } }[];
	status: 'OK' | 'ZERO_RESULTS';
};

declare var google: any;

function searchAdressHandler(event: Event) {
	event.preventDefault();
	const enteredAdress = encodeURI(adressInput.value);

	axios
		.get<GoogleGeocodingResponse>(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${enteredAdress}&key=${GOOGLE_API_KEY}`
		)
		.then((response) => {
			if (response.data.status !== 'OK') {
				throw new Error('Could not fetch location!');
			}
			const coordinates = response.data.results[0].geometry.location;
			const map = new google.maps.Map(document.getElementById('map'), {
				center: coordinates,
				zoom: 16,
			});
			console.log(coordinates);
			new google.maps.Marker({ position: coordinates, map: map });
		})
		.catch((err) => {
			console.log(err);
		});
}

form.addEventListener('submit', searchAdressHandler);
