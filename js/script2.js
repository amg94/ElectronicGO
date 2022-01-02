window.onload = function () {
	//Variables
	const d = document;
	let catalogo = d.getElementById('catalogo');
	let myModal = d.getElementById('modalGeneral');
	let navB = d.getElementById('navB');
	let modalCarrito = d.getElementById('modalCarrito');
	let contador = d.getElementById('contador');
	let carro = {
		productos: [],
		cantidad: [],
		total: 0,
		cont: 0,
	};

	//LOCALSTORAGE
	if (localStorage.carro) {
		carro = JSON.parse(localStorage.carro);
	} else {
		localStorage.carro = JSON.stringify(carro);
	}

	//CONTADORES
	let navContador = d.createElement('nav');
	navContador.className = 'navbar navbar-expand-lg navbar-light bg-dark sticky container-fluid justify-content-center shadow-lg text-white';
	navB.appendChild(navContador);
	//
	let divCont = d.createElement('div');
	divCont.className = 'row justify-content-center';
	navContador.appendChild(divCont);
	///
	let spanC = d.createElement('span');
	spanC.className = 'mr-2 font-weight-bold';
	spanC.innerHTML = 'TOTAL $ ';
	divCont.appendChild(spanC);
	///
	let spanC2 = d.createElement('span');
	divCont.appendChild(spanC2);

	//CARRITO
	let carrito = d.createElement('div');
	carrito.className = 'modal-dialog modal-dialog-centered';
	modalCarrito.appendChild(carrito);
	//
	let divMC = d.createElement('div');
	divMC.className = 'modal-content';
	carrito.appendChild(divMC);
	//
	let divHC = d.createElement('div');
	divHC.className = 'modal-header border-bottom border-dark';
	divMC.appendChild(divHC);
	///
	let hC = d.createElement('h5');
	hC.innerHTML = 'Detalle de compra';
	hC.className = 'modal-title';
	divHC.appendChild(hC);
	///
	let btnCC = d.createElement('button');
	btnCC.className = 'close cerrar2';
	btnCC.type = 'button';
	divHC.appendChild(btnCC);
	//
	let btnSpan = d.createElement('span');
	btnSpan.innerHTML = '&times;';
	btnCC.appendChild(btnSpan);
	//
	let divBC = d.createElement('div');
	divBC.className = 'modal-body border-bottom border-dark container';
	divMC.appendChild(divBC);
	//
	///
	let contTotal = d.createElement('div');
	contTotal.className = 'row justify-content-center mt-2';
	divBC.appendChild(contTotal);
	////
	let btnEliminar = d.createElement('button');
	btnEliminar.type = 'button';
	btnEliminar.className = 'btn btn-danger col-4 ml-3';
	btnEliminar.innerHTML = 'Vaciar carrito';
	contTotal.appendChild(btnEliminar);
	////
	let totalPC = d.createElement('span');
	totalPC.className = 'col-6 font-weight-bold border-top ml-5 pt-2';
	totalPC.innerHTML = 'Total $';
	contTotal.appendChild(totalPC);
	///
	let totalC = d.createElement('span');
	totalC.className = 'text-dark font-weight-normal ml-2';
	totalPC.appendChild(totalC);
	//
	let divFC = d.createElement('div');
	divFC.className = 'modalF modal-footer row';
	divMC.appendChild(divFC);
	///
	let btnComprarC = d.createElement('button');
	btnComprarC.className = 'btn btn-info cerrar2 col ml-3 mr-2';
	btnComprarC.type = 'button';
	btnComprarC.innerHTML = 'Seguir compra';
	divFC.appendChild(btnComprarC);
	////
	let btnCerrarC = d.createElement('button');
	btnCerrarC.type = 'button';
	btnCerrarC.className = 'btn btn-success col ml-2 mr-3';
	btnCerrarC.innerHTML = 'Terminar compra';
	divFC.appendChild(btnCerrarC);
	/////
	$(document).ready(function () {
		$('#carrito').click(function () {
			$(modalCarrito).modal();
		});
	});
	$(document).ready(function () {
		$('.cerrar2').click(function () {
			$(modalCarrito).modal('hide');
		});
	});


	// BILLETERA //
	//Mostrar y ocultar formularios
	$('.debito__form').hide();
	$('.credito__button').click(function (e) {
		e.preventDefault();
		$(this).addClass('active');
		$('.debito__button').removeClass('active');
		$('.credito__form').show();
		$('.debito__form').hide();
	});
	$('.debito__button').click(function (e) {
		e.preventDefault();
		$(this).addClass('active');
		$('.credito__button').removeClass('active');
		$('.debito__form').show();
		$('.credito__form').hide();
	});


	//MODAL
	let modalGeneral = d.createElement('div');
	modalGeneral.className = 'modal-dialog modal-dialog-centered';
	myModal.appendChild(modalGeneral);
	//
	let divM = d.createElement('div');
	divM.className = 'modal-content container';
	modalGeneral.appendChild(divM);
	///
	let divH = d.createElement('div');
	divH.className = 'modalHeader row-reverse';
	divM.appendChild(divH);
	////
	let btnC = d.createElement('button');
	btnC.innerHTML = '&times;';
	btnC.className = 'close cerrar m-2';
	btnC.type = 'button';
	divH.appendChild(btnC);
	///
	let divB = d.createElement('div');
	divB.className = 'card-body container';
	divM.appendChild(divB);
	////
	let imgM = d.createElement('img');
	imgM.className = 'card-img imagenM mx-auto row border-bottom border-dark';
	divB.appendChild(imgM);
	////
	let desc = d.createElement('p');
	desc.className = 'row pt-3 mx-1';
	divB.appendChild(desc);
	////
	let precioModal = d.createElement('span');
	precioModal.className = 'row font-weight-bold justify-content-center';
	divB.appendChild(precioModal);
	///
	let divF = d.createElement('div');
	divF.className = 'modal-footer row justify-content-around';
	divM.appendChild(divF);
	////
	let btnComprar = d.createElement('button');
	btnComprar.className = 'btn btn-success agregar';
	btnComprar.type = 'button';
	btnComprar.innerHTML = 'Agregar al carrito';
	divF.appendChild(btnComprar);
	////
	let btnCerrar = d.createElement('button');
	btnCerrar.type = 'button';
	btnCerrar.className = 'btn btn-danger cerrar px-5';
	btnCerrar.innerHTML = 'Cerrar';
	divF.appendChild(btnCerrar);

	// PRODUCTOS //

	//Filtro de categorías
	(function () {
		$(document).ready(function () {
			$(".categoria").click(function (e) {
				e.preventDefault();
				var filtro = $(this).attr("data-filter");

				if (filtro === "todos") {
					$(".producto").show(500);
				} else {
					$(".producto").not("." + filtro).hide(500);
					$(".producto").filter("." + filtro).show(500);
				}
			});

			$(".producto").click(function () {
				$(this).addClass("active").siblings().removeClass("active");
			});
		});
	}())

	//Listado de productos
	let aProductos = [{
			nombre: 'NVidia GeForce Aorus RTX 3090',
			imagen: './media/placas/NVIDIA-GEFORCE-AORUS-RTX-3090-MASTER.jpg',
			descripcion: 'Placa de video NVidia GeForce Aorus RTX 3090 con memoria GDDR6 de 8Gb, 14 Gbps y resolución hasta 4K.',
			precio: 302680,
			tipo: 'Video',
			ventas: 0,
			id: 1,
		},
		{
			nombre: 'AMD Radeon Rx 5600 xt ASUS',
			imagen: './media/placas/AMD-RADEON-RX-5600-XT-ASUS-DUAL.jpg',
			descripcion: 'Placa de video AMD Radeon Rx 5600 xt ASUS con memoria GDDR6 de 6Gb, 12 Gbps y resolución hasta 4K.',
			precio: 39468,
			tipo: 'Video',
			ventas: 0,
			id: 2,
		},
		{
			nombre: 'AMD Radeon Rx 5700 xt Gigabyte',
			imagen: './media/placas/AMD-RADEON-RX-5700-XT-GIGABYTE-GAMING.jpg',
			descripcion: 'Placa de video AMD Radeon Rx 5700 xt Gigabyte con memoria GDDR6 de 6Gb, 14 Gbps y resolución hasta 4K.',
			precio: 59791,
			tipo: 'Video',
			ventas: 10,
			id: 3,
		},
		{
			nombre: 'AMD Radeon Rx 5700 xt MSI Mech',
			imagen: './media/placas/AMD-RADEON-RX-5700-XT-MSI-MECH.jpg',
			descripcion: 'Placa de video AMD Radeon Rx 5700 xt MSI Mech con memoria GDDR6 de 6Gb, 14 Gbps y resolución hasta 4K.',
			precio: 56948,
			tipo: 'Video',
			ventas: 0,
			id: 4,
		},
		{
			nombre: 'AMD Radeon Rx 5700 xt Sapphire',
			imagen: './media/placas/AMD-RADEON-RX-5700-XT-SAPPHIRE-PULSE.jpg',
			descripcion: 'Placa de video AMD Radeon Rx 5700 xt Sapphire con memoria GDDR6 de 8Gb, 14 Gbps y resolución hasta 4K.',
			precio: 61639,
			tipo: 'Video',
			ventas: 0,
			id: 5,
		},
		{
			nombre: 'NVidia GeForce RTX 3070 XLR8',
			imagen: './media/placas/NVIDIA-GEFORCE-RTX-3070-XLR8-REVEL-GAMING.jpg',
			descripcion: 'Placa de video NVidia GeForce RTX 3070 XLR8 con memoria GDDR6 de 8Gb, 14 Gbps y resolución hasta 4K.',
			precio: 100280,
			tipo: 'Video',
			ventas: 10,
			id: 6,
		},
		{
			nombre: 'Procesador AMD Ryzen 5 5600x',
			imagen: './media/procesadores/PROCESADOR-AMD-RYZEN-5-5600x.jpg',
			descripcion: 'Procesador AMD Ryzen 5 5600x con 6 núcleos y memoria DDR4 de hasta 3200mHz de velocidad.',
			precio: 35695,
			tipo: 'Procesadores',
			ventas: 0,
			id: 7,
		},
		{
			nombre: 'Procesador AMD Ryzen 7 5800x',
			imagen: './media/procesadores/PROCESADOR-AMD-RYZEN-7-5800.jpg',
			descripcion: 'Procesador AMD Ryzen 7 5800x con 8 núcleos y memoria DDR4 de hasta 3200mHz de velocidad.',
			precio: 56115,
			tipo: 'Procesadores',
			ventas: 10,
			id: 8,
		},
		{
			nombre: 'Procesador AMD Ryzen 9 3950x',
			imagen: './media/procesadores/PROCESADOR-AMD-RYZEN-9-3950x.jpg',
			descripcion: 'Procesador AMD Ryzen 9 3950x con 16 núcleos y memoria DDR4 de hasta 3200mHz de velocidad.',
			precio: 88688,
			tipo: 'Procesadores',
			ventas: 0,
			id: 9,
		},
		{
			nombre: 'Procesador Intel Core I7 10700f',
			imagen: './media/procesadores/PROCESADOR-INTEL-CORE-I7-10700f.jpg',
			descripcion: 'Procesador Intel Core I7 10700f con 8 núcleos y memoria DDR4 de hasta 2900mHz de velocidad.',
			precio: 38639,
			tipo: 'Procesadores',
			ventas: 10,
			id: 10,
		},
		{
			nombre: 'Procesador Intel Core I9 10850K',
			imagen: './media/procesadores/PROCESADOR-INTEL-CORE-I9-10850K.jpg',
			descripcion: 'Procesador Intel Core I9 10850K con 10 núcleos y memoria DDR4 de hasta 3600mHz de velocidad.',
			precio: 56580,
			tipo: 'Procesadores',
			ventas: 0,
			id: 11,
		},
		{
			nombre: 'Procesador Intel Pentium Gold',
			imagen: './media/procesadores/PROCESADOR-INTEL-PENTIUM-GOLD-G5420.jpg',
			descripcion: 'Procesador Intel Pentium Gold con 2 núcleos y memoria DDR4 de hasta 2300mHz de velocidad.',
			precio: 6439,
			tipo: 'Procesadores',
			ventas: 0,
			id: 12,
		},
		{
			nombre: 'Memoria DDR4 16Gb Corsair Airflow Red',
			imagen: './media/memorias/MEMORIA-DDR4-16GB-CORSAIR-AIRFLOW-RED.jpg',
			descripcion: 'Memoria RAM Corsair Airflow Red DDR4 de 16Gb y 4266MHZ.',
			precio: 26680,
			tipo: 'RAM',
			ventas: 0,
			id: 13,
		},
		{
			nombre: 'Memoria DDR4 16Gb Corsair Dominator',
			imagen: './media/memorias/MEMORIA-DDR4-16GB-CORSAIR-DOMINATOR.jpg',
			descripcion: 'Memoria RAM Corsair Dominator DDR4 de 16Gb y 4000MHZ.',
			precio: 34959,
			tipo: 'RAM',
			ventas: 10,
			id: 14,
		},
		{
			nombre: 'Memoria DDR4 16Gb Aorus Dual Channel',
			imagen: './media/memorias/MEMORIA-DDR4-16GB-DUAL-CHANNEL-AORUS.jpg',
			descripcion: 'Memoria RAM Aorus Dual Channel DDR4 de 16Gb y 4400MHZ.',
			precio: 22079,
			tipo: 'RAM',
			ventas: 0,
			id: 15,
		},
		{
			nombre: 'Memoria DDR4 16Gb Aorus Gigabyte',
			imagen: './media/memorias/MEMORIA-DDR4-16GB-GIGABYTE-AORUS.jpg',
			descripcion: 'Memoria RAM Aorus Gigabyte DDR4 de 16Gb y 3600MHZ.',
			precio: 16559,
			tipo: 'RAM',
			descuento: 0,
			id: 16,
		},
		{
			nombre: 'Memoria DDR4 16Gb HyperX Fury Gamer',
			imagen: './media/memorias/MEMORIA-DDR4-16GB-HYPERX-FURY-GAMER.jpg',
			descripcion: 'Memoria RAM HyperX Fury Gamer DDR4 de 16Gb y 3200MHZ.',
			precio: 8739,
			tipo: 'RAM',
			ventas: 10,
			id: 17,
		},
		{
			nombre: 'Memoria DDR4 16Gb Corsair Vengeance',
			imagen: './media/memorias/MEMORIA-DDR4-32GB-CORSAIR-VENGEANCE.jpg',
			descripcion: 'Memoria RAM Corsair Vengeance DDR4 de 16Gb y 3600MHZ.',
			precio: 16559,
			tipo: 'RAM',
			ventas: 0,
			id: 18,
		},
		{
			nombre: 'Motherboard Asus RoG Strix B550E B550',
			imagen: './media/motherboards/MOTHERBOARD-ASUS-ROG-STRIX-B550E-B550.jpg',
			descripcion: 'Motherboard Asus para serie Ryzen 3°Gen, RAM DDR4 de 128GB y AMD B550.',
			precio: 31555,
			tipo: 'Motherboard',
			ventas: 10,
			id: 19,
		},
		{
			nombre: 'Motherboard Asus Crosshair VIII Hero',
			imagen: './media/motherboards/MOTHERBOARD-ASUS-ROG-STRIX-CROSSHAIR-VIII.jpg',
			descripcion: 'Motherboard Asus para serie Ryzen 4°Gen, RAM DDR4 de 128GB y AMD X570.',
			precio: 47380,
			tipo: 'Motherboard',
			ventas: 0,
			id: 20,
		},
		{
			nombre: 'Motherboard Gigabyte B550 Aorus Pro AMD',
			imagen: './media/motherboards/MOTHERBOARD-GIGABYTE-B550-AORUS-PRO.jpg',
			descripcion: 'Motherboard Gigabyte para serie Ryzen 3°Gen, RAM DDR4 de 128GB y AMD B550.',
			precio: 29439,
			tipo: 'Motherboard',
			ventas: 0,
			id: 21,
		},
		{
			nombre: 'Motherboard Gigabyte B550 Vision D AMD',
			imagen: './media/motherboards/MOTHERBOARD-GIGABYTE-B550-VISION-D-AMD.jpg',
			descripcion: 'Motherboard Gigabyte para serie Ryzen 3°Gen, RAM DDR4 de 128GB y AMD B550.',
			precio: 36799,
			tipo: 'Motherboard',
			ventas: 10,
			id: 22,
		},
		{
			nombre: 'Motherboard Gigabyte GA Z490 Aorus Pro AX',
			imagen: './media/motherboards/MOTHERBOARD-GIGABYTE-GA-Z490-AORUS-PRO.jpg',
			descripcion: 'Motherboard Gigabyte para serie Intel I9, RAM DDR4 de 128GB y Intel Z490.',
			precio: 33303,
			tipo: 'Motherboard',
			ventas: 0,
			id: 23,
		},
		{
			nombre: 'Motherboard Gigabyte X570 Aorus Ultra',
			imagen: './media/motherboards/MOTHERBOARD-GIGABYTE-X570-AORUS-ULTRA.jpg',
			descripcion: 'Motherboard Gigabyte para serie Ryzen 3°Gen, RAM DDR4 de 128GB y AMD X570.',
			precio: 41400,
			tipo: 'Motherboard',
			ventas: 0,
			id: 24,
		},
		{
			nombre: 'CPU Cooler Master Air Twin Tower',
			imagen: './media/coolers/CPU-FAN-COOLER-MASTER-AIR-TWIN-TOWER.jpg',
			descripcion: 'Cooler con dos juegos de ventiladores ámplios para mayor cobertura y LEDs RGB.',
			precio: 16559,
			tipo: 'Cooler',
			ventas: 10,
			id: 25,
		},
		{
			nombre: 'CPU Cooler Master Fan Masterair',
			imagen: './media/coolers/CPU-FAN-COOLER-MASTERRAIR-MA610P-MASTER.jpg',
			descripcion: 'Cooler ventilador de alta potencia y 6 tubos de calor para mejor disipado.',
			precio: 15639,
			tipo: 'Cooler',
			ventas: 0,
			id: 26,
		},
		{
			nombre: 'CPU Fan Coolermaster Masterair',
			imagen: './media/coolers/CPU-FAN-COOLERMASTER.MASTERRAIR-MA410M.jpg',
			descripcion: 'Cooler ventilador de gran potencia, 4 tubos de disipación y aletas de aluminio.',
			precio: 20239,
			tipo: 'Cooler',
			ventas: 10,
			id: 27,
		},
		{
			nombre: 'Water Cooling Master Cooler Masterliquid',
			imagen: './media/coolers/WATER-COOLING-COOLER-MASTERLIQUID.jpg',
			descripcion: 'Cooler de refrigeración dual, una bomba líquida y dos juegos de ventiladores.',
			precio: 32199,
			tipo: 'Cooler',
			ventas: 0,
			id: 28,
		},
		{
			nombre: 'Water Cooling Masterliquid ML120R',
			imagen: './media/coolers/WATER-COOLING-MASTERLIQUID-Ml120R.jpg',
			descripcion: 'Cooler de refrigeración dual, una bomba líquida y un juego de ventiladores.',
			precio: 25759,
			tipo: 'Cooler',
			ventas: 0,
			id: 29,
		},
		{
			nombre: 'Watercooling Asus RoG Strix Aura',
			imagen: './media/coolers/WATERCOOLING-ASUS-ROG-STRIX-AURA-SYNC.jpg',
			descripcion: 'Cooler con bomba de refrigeración diseñada equipos de alto rendimiento.',
			precio: 27591,
			tipo: 'Cooler',
			ventas: 0,
			id: 30,
		},
	];


	//El catálogo
	for (let producto of aProductos) {
		//div
		let div1 = d.createElement('div');
		switch (producto.tipo) {
			case 'Video':
				div1.className += 'producto col-12 col-sm-6 col-md-4 col-lg-3 mb-4 video';
				break;
			case 'Motherboard':
				div1.className += 'producto col-12 col-sm-6 col-md-4 col-lg-3 mb-4 motherboard';
				break;
			case 'Procesadores':
				div1.className += 'producto col-12 col-sm-6 col-md-4 col-lg-3 mb-4 procesadores';
				break;
			case 'RAM':
				div1.className += 'producto col-12 col-sm-6 col-md-4 col-lg-3 mb-4 ram';
				break;
			case 'Cooler':
				div1.className += 'producto col-12 col-sm-6 col-md-4 col-lg-3 mb-4 cooler';
				break;
		}
		if (catalogo.className == 'row vendidos' && producto.ventas > 0) {
			catalogo.appendChild(div1);
		} else if (catalogo.className != 'row vendidos') {
			catalogo.appendChild(div1);
		}
		//div
		let div2 = d.createElement('div');
		div2.className = 'card shadow';
		div1.appendChild(div2);
		//img
		let img = d.createElement('img');
		img.src = producto.imagen;
		img.className = 'card-img mt-3 imagen mx-auto';
		img.alt = producto.nombre;
		div2.appendChild(img);
		//div
		let div3 = d.createElement('div');
		div3.className = 'card-body';
		div2.appendChild(div3);
		//h5 titulo
		let h5 = d.createElement('h5');
		h5.className = 'card-title text-center'
		h5.innerHTML = producto.nombre;
		div3.appendChild(h5);
		//Descripcion
		let pDesc = d.createElement('p');
		pDesc.className = 'text-center'
		pDesc.innerHTML = producto.descripcion;
		pDesc.style.fontSize = '0.95em';
		div3.appendChild(pDesc);
		//p precio
		let p = d.createElement('p');
		p.className = 'text-center mb-3 mt-3';
		p.innerHTML = '$' + producto.precio;
		div3.appendChild(p);
		//div
		let div4 = d.createElement('div');
		div4.className = 'producto d-flex justify-content-around';
		div3.appendChild(div4);
		//a btn ver mas
		let a = d.createElement('a');
		a.className = 'btn rounded btn-primary mr-3 verDescripcion';
		a.innerHTML = 'VER MÁS';
		div4.appendChild(a);
		//a btn comprar
		let a2 = d.createElement('a');
		a2.className = 'btn rounded btn-success agregar';
		a2.dataset.nombre = producto.nombre;
		a2.dataset.precio = producto.precio;
		a2.dataset.imagen = producto.imagen;
		a2.dataset.id = producto.id;
		div4.appendChild(a2);
		a.onclick = function () {
			imgM.src = producto.imagen;
			desc.innerHTML = producto.descripcion;
			precioModal.innerHTML = '$ ' + producto.precio;
			btnComprar.dataset.nombre = producto.nombre;
			btnComprar.dataset.precio = producto.precio;
			btnComprar.dataset.imagen = producto.imagen;
			btnComprar.dataset.id = producto.id;
			btnComprar.className += ' agregar'
			$(document).ready(function () {
				$('.cerrar').click(function () {
					$(myModal).modal('hide');
				});
			});
		}
		let i = d.createElement('i');
		i.className = 'fas fa-shopping-cart';
		a2.appendChild(i);

		$(document).ready(function () {
			$('.verDescripcion').click(function () {
				$(myModal).modal();
			});
		});
	}

	for (let i = 0; i < carro.productos.length; i++) {
		let productoId = carro.productos[i];
		let cantidad = carro.cantidad[i];
		console.log(productoId + ' x ' + cantidad);
		for (let producto of aProductos) {
			if (producto.id === productoId) {
				let productoC = d.createElement('div');
				productoC.className = 'row rounded align-middle';
				divBC.insertBefore(productoC, divBC.childNodes[0]);
				//
				let imgC = d.createElement('img');
				imgC.src = producto.imagen;
				imgC.className = 'col-5';
				productoC.appendChild(imgC);
				//
				let row = d.createElement('div');
				row.className = 'col-7 mt-1 mt-sm-4';
				productoC.appendChild(row);
				//
				let name = d.createElement('h4');
				name.style.fontSize = '1rem';
				name.innerHTML = producto.nombre;
				row.appendChild(name);
				//
				let row2 = d.createElement('div');
				row2.className = 'row justify-content-center mr-4';
				row.appendChild(row2);
				//
				let btnCarrito = d.createElement('button');
				btnCarrito.innerHTML = '-';
				btnCarrito.className = 'btn quitar col-3 btn-danger mr-sm-1';
				btnCarrito.dataset.id = producto.id;
				btnCarrito.dataset.precio = producto.precio;
				row2.appendChild(btnCarrito);
				//
				let cantidadC = d.createElement('span');
				cantidadC.className = 'col-2 mr-2 mr-md-1 ml-sm-2 mt-1';
				cantidadC.innerHTML = carro.cantidad[i];
				row2.appendChild(cantidadC);
				//
				let btnCarrito2 = d.createElement('button');
				btnCarrito2.innerHTML = '+';
				btnCarrito2.className = 'agregar btn col-3 btn-success';
				btnCarrito2.dataset.id = producto.id;
				btnCarrito2.dataset.precio = producto.precio;
				row2.appendChild(btnCarrito2);
			}
		}
	}

	let addBtns = d.querySelectorAll('.agregar');
	let delBtns = d.querySelectorAll('.quitar');

	for (let btn of addBtns) {
		btn.onclick = function () {
			carro.cont++;
			let id = parseInt(btn.dataset.id);
			let val = parseInt(btn.dataset.precio);
			let indice = carro.productos.indexOf(id);
			if (indice == -1) {
				carro.productos.push(id);
				carro.cantidad.push(1);
			} else {
				carro.cantidad[indice]++;
			}
			carro.total = parseInt(carro.total) + val;
			localStorage.carro = JSON.stringify(carro);
			totalC.innerHTML = carro.total;
			contador.innerHTML = carro.cont;
			spanC2.innerHTML = carro.total;
		}
	}

	for (let btn of delBtns) {
		btn.onclick = function () {
			let id = parseInt(this.dataset.id);
			let val = parseInt(this.dataset.precio);
			let indice = carro.productos.indexOf(id);
			if (indice != -1) {
				if (carro.cantidad[indice] > 0) {
					carro.cantidad[indice]--;
					carro.total = parseInt(carro.total) - val;
					carro.cont--;
				}
			}
			localStorage.carro = JSON.stringify(carro);
		}
	}

	btnEliminar.onclick = function () {
		// Limpiar el localStorage:
		localStorage.clear();
		// Refrescar la página:
		location.reload();
	}

	totalC.innerHTML = carro.total;
	contador.innerHTML = carro.cont;
	spanC2.innerHTML = carro.total;
}