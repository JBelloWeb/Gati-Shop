'use strict';

//Creo la clase producto
class Producto{
    #id;
    // nombre;
    // descripcion;
    // precio;
    // imagen;
    // categoria;

    constructor(nombre = 'Nombre', descripcion = 'Descripción', precio = 0, imagen = '#', categoria = 'Común'){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = parseFloat(precio);
        this.imagen = imagen;
        this.categoria = categoria;
    }

    set setId(id){
        this.#id = parseInt(id);
    }

    get getId(){
        return this.#id;
    }
}
class Item{
    constructor(tipo = 'Nombre', precioUnidad = 0){
        this.tipo = tipo;
        this.cantidad = 1;
        this.precioUnidad = precioUnidad;
        this.precioTotal = 0;
    }

    set setCant(cantidad){
        this.cantidad += cantidad;
        this.precioTotal = this.precioUnidad * this.cantidad;
    }

}

let carrito = {
    productos : [],
    totalProductos: -1,
    total : `$${0}`,
};

//Creo el array con los productos
let productos = [
    new Producto('Negro', 'Impredescible', 1.50, 'cat.png', 'Común'),
    new Producto('Siames', 'Impredescible', 1.50, 'cat-s.png', 'Común'),
    new Producto('Marmolado', 'Impredescible', 1.50, 'cat-m.png', 'Común'),
    new Producto('Naranja', 'Impredescible', 1.50, 'cat-o.png', 'Común'),
];

//Defino su id con un contador
let count = 1;
for(let g of productos){
    g.setId = count;
    count++;
}

//Obtengo las referencias del documento
const d = document;
let header = d.querySelector('#header');
let catalogo = d.querySelector('#catalogo');

//Instancio los productos en el documento
for(let p of productos){
    let f = d.createElement('figure')
    let img = d.createElement('img')
    img.src = `assets/img/${p.imagen}`;
    f.appendChild(img);

    let buttons = d.createElement('div');
    let a = d.createElement('p');
    a.innerHTML = `AGREGAR`;
    a.addEventListener('click', (e) =>{
        AgregarAlCarrito(p);
    })
    let v = d.createElement('p');
    v.innerHTML = `VER`;
    //Creación de Modales
    v.addEventListener('click', ()=>{
        CrearModal(p);
    }); 

    buttons.appendChild(a);
    buttons.appendChild(v);
    buttons.className = 'botones';

    let div = d.createElement('div');
    div.appendChild(f);
    div.appendChild(buttons);
    div.className = 'carta';

    catalogo.appendChild(div);
}

const AgregarAlCarrito = (p) =>{
    if(carrito.totalProductos === -1) CrearCarrito();
    const existente = carrito.productos.find(i => i.tipo === p.nombre);
    if(existente){
        existente.setCant = 1;
    } else{
        let nuevo = new Item(p.nombre, p.precio);
        carrito.productos.push(nuevo);
        nuevo.setCant = 0;
    }
    ActualizarCarrito();
}

const QuitarDelCarrito = (p) =>{
    if(carrito.totalProductos === -1) return;
    const item = carrito.productos.find(i => i.tipo === p.nombre);
    if(item){
        item.setCant = -1;
    } else {return;}
    ActualizarCarrito();
}

const CrearCarrito = () =>{
    let carro = d.createElement('div');
    let ul = d.createElement('ul');
    carro.appendChild(ul);
    carro.id = 'carrito';
    header.appendChild(carro);
    carrito.totalProductos = 0;
}

const ActualizarCarrito = () =>{
    let carro = header.querySelector('#carrito');
    let ul = carro.querySelector('ul');
    let lis = ul.querySelectorAll('li');
    for(let li of lis){
        li.remove();
    }

    for(let p of carrito.productos){
        if(p.cantidad <= 0){
            for(let li of lis){
                if(li.contains(p.nombre)) remove(li);
            }
        } else{ 
            let li = d.createElement('li');
            li.innerHTML =  `${p.tipo} (${p.cantidad}) $${p.precioTotal}`;
            li.style= 'color: white;';
            ul.appendChild(li);
        }
    }

    console.log(carrito.productos);
}

//Función para crear el modal
const CrearModal = (p) =>{
    let modales = d.querySelectorAll('.modal');
    catalogo.className = 'disabled';
    
    //Si hay un modal activo,lo removemos
    for(let m of modales){
        m.remove();
    }

    let modal = new Producto(p.nombre, p.descripcion, p.precio, p.imagen, p.categoria);

    let div = d.createElement('div');
    let innerDiv= d.createElement('div');
    let titulo = d.createElement('h2');
    titulo.innerHTML = modal.nombre;
    let desc = d.createElement('p');
    desc.innerHTML = modal.descripcion;
    let pre = d.createElement('p');
    pre.innerHTML = modal.precio;
    let cate = d.createElement('p');
    cate.innerHTML = modal.categoria;
    let fig = d.createElement('figure');
    let img = d.createElement('img');
    fig.appendChild(img);
    img.src = `assets/img/${modal.imagen}`;
    let botones = d.createElement('div');
    let agregar = d.createElement('p');
    let quitar = d.createElement('p');
    let close = d.createElement('p');
    agregar.innerHTML = '+';
    agregar.addEventListener('click', (e) =>{
        AgregarAlCarrito(p);
    })
    quitar.innerHTML = '-';
    quitar.addEventListener('click', (e) =>{
        QuitarDelCarrito(p);
    })
    close.innerHTML = 'X';
    agregar.style = 'cursor: pointer;'
    quitar.style = 'cursor: pointer;'
    close.style = 'cursor: pointer; color: var(--main-lightblue);'
    close.addEventListener('click', (e) =>{
        catalogo.classList = '';
        div.remove();
        d.removeEventListener('click', (e));
    })
    d.addEventListener('keydown', (e) =>{
        if(e.key == 'Escape'){
            catalogo.classList = '';
            div.remove();
            d.removeEventListener('keydown',(e));
        }
    });

    div.appendChild(fig);
    innerDiv.appendChild(titulo);
    innerDiv.appendChild(desc);
    innerDiv.appendChild(pre);
    innerDiv.appendChild(cate);
    botones.appendChild(quitar);
    botones.appendChild(close);
    botones.appendChild(agregar);
    botones.className = 'botones';
    innerDiv.appendChild(botones);
    div.appendChild(innerDiv);
    innerDiv.className = 'in-div';

    div.className ='modal';

    catalogo.appendChild(div);
}