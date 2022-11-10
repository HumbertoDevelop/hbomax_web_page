/** @format */

//? Solicitud API
//TODO https://api.themoviedb.org/3/movie/550?api_key=328a621a94172349a5b39950ecacdd62
//TODO 328a621a94172349a5b39950ecacdd62

//? Token de acceso
//TODO eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjhhNjIxYTk0MTcyMzQ5YTViMzk5NTBlY2FjZGQ2MiIsInN1YiI6IjYxNDM2OGRmODVkYTEyMDAyMGI1YTEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yi1mVdMRSUD31bDTgWpViHV7Pt6jaNf3sj46FDEWEMY

//? Ejemplo
//TODO http://api.themoviedb.org/3/tv/popular?api_key=328a621a94172349a5b39950ecacdd62

//?Images
//TODO https://image.tmdb.org/t/p/w500/

const d = document;
let own_id = 0;
const back_img = d.querySelector("#background_img");
const card_img = d.querySelector("#card_img");
const logo_tag = d.querySelector("#logo");
let i = 0;
let movies_arr = [];
const title = d.querySelector("#title");
const overview = d.querySelector("#overview");
const language = d.querySelector("#language");
const genre = d.querySelector("#genres");
const rate = d.querySelector("#rate");

d.addEventListener("DOMContentLoaded", () => {
	let focus = "tv/popular";

	getResponse(focus);
});

async function getResponse(focus) {
	try {
		let api_key = "328a621a94172349a5b39950ecacdd62";
		let base_url = "https://api.themoviedb.org/3/";
		const response = await fetch(`${base_url}${focus}?api_key=${api_key}`);

		if (!response.ok) console.info("Algo anda mal en la peticion");
		const data = await response.json();

		await extract_data(data);
		await set_movie(movies_arr);
	} catch (error) {
		throw Error(error);
	}
}

// * Extrae la data y la setea en otro array
const extract_data = async (data) => {
	let base_img_url = "https://image.tmdb.org/t/p/original/";
	// data.results.filter(
	// 	({ name, original_language, overview, vote_average, backdrop_path }) => {

	// 		let img = base_img_url + backdrop_path;
	// 		if (backdrop_path) {
                
    //             movies_arr.push({
    //                 id: own_id,
    //                 url_img: img,
    //                 name_movie: name,
    //                 language: original_language,
    //                 bio: overview,
    //                 rating: vote_average,
    //             });
    //             own_id++;
    //         }
	// 	}
	// );
	data.results.forEach(
		({ name, original_language, overview, vote_average, backdrop_path,genre_id }) => {
			// * Poster_path or Backdrop_path
            if (!(backdrop_path)) return false;
                
                let img = base_img_url + backdrop_path;

				movies_arr.push({
                    id: own_id,
					url_img: img,
					name_movie: name,
					language: original_language,
					bio: overview,
					rating: vote_average,
					genre: genre_id
				});
				own_id++;
			}

	);
	logo_tag.setAttribute(
		"src",
		"./imgs/HBO_Max_Logo.png"
		// "https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
	);
	logo_tag.setAttribute("alt", "logo.svg");
};

// * Funcion para retornar una imagen posterpath dependiendo de la pelicula
async function set_movie(data) {
    console.log(data);
	const card = d.querySelector(".card_movie");
	// d.querySelector("body").prepend()
	// TODO para hacer efecto de que cambie de pelicula usando el backend, debo setear la imagen de la siguiente pelicula en el body con opacidad y luego mover la pelicula actual a un lado para que la proxima se ponga en todo el frente.
	// let inter = setInterval(() => {
        back_img.setAttribute("src", data[i].url_img);
        back_img.setAttribute("alt", "movie_image.jpg");
        title.innerHTML = data[i].name_movie;
        overview.innerHTML = data[i].bio;
        language.innerHTML = "Language: "+data[i].language + "<br> Subtitle: None";
        if (data[i].rating > 0) {
            rate.innerHTML = "⭐⭐⭐⭐⭐";
        }
        i++;

    // }, 4000);
let count_move = -250;
    // let inter2 = setInterval(() => {
    //         card.style.setProperty("transform", `trnaslateX(${count_move})`);
    //         count_move += 250
    // }, 3700);

	data.forEach(({ id,url_img }) => {
        const my_element = d.createElement("img");
		my_element.setAttribute("alt", "movie_image.jpg");
		my_element.setAttribute("src", url_img);
		card.append(my_element);

	});
	return true;
}

// * Function para sacar generos
function load_genres(data) {
	data.forEach((el) => {
		console.log(el);
		return true
	});
}

// * Function para setear las cartas de las peliculas
async function set_card(movies) {
	const result = await function movie_card() {
		let template = ` <div class="card_movie scroll_hidden">
        <img src="" alt="" id="card_img" >
    </div> `;

		return template;
	};
	card_img.setAttribute("src", data[i].url_img);
	card_img.setAttribute("alt", "movie_image.jpg");
}

// * Function para retornar las estrellas de una pelicula
function get_stars(rating) {
	console.log(rating);
	switch (rating) {
		case rating < 1:
			return "No ranking yet";
		case rating < 2:
			return "⭐⭐";
		case rating < 3:
			return "⭐⭐⭐";
		case rating < 4:
			return "⭐⭐⭐⭐";
		case rating < 5:
			return "⭐⭐⭐⭐⭐";
		case rating > 5:
			return "⭐⭐⭐⭐⭐";

		default:
			break;
	}
}
