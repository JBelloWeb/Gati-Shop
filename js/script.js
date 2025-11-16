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

//Creo el array con los productos
let productos = [
    new Producto('Naranja', 'Impredescible', 1.50, 'cat.png', 'Común'),
    new Producto('Naranja', 'Impredescible', 1.50, 'cat-s.png', 'Común'),
    new Producto('Naranja', 'Impredescible', 1.50, 'cat-m.png', 'Común'),
    new Producto('Naranja', 'Impredescible', 1.50, 'cat-o.png', 'Común'),
    new Producto('Naranja', 'Impredescible', 1.50, 'cat.png', 'Común'),
    new Producto('Naranja', 'Impredescible', 1.50, 'cat-s.png', 'Común'),
    new Producto('Naranja', 'Impredescible', 1.50, 'cat-m.png', 'Común'),
    new Producto('Naranja', 'Impredescible', 1.50, 'cat-o.png', 'Común'),
    new Producto('Naranja', 'Impredescible', 1.50, 'cat.png', 'Común'),
    new Producto('Naranja', 'Impredescible', 1.50, 'cat-s.png', 'Común'),
    new Producto('Naranja', 'Impredescible', 1.50, 'cat-m.png', 'Común'),
    new Producto('Naranja', 'Impredescible', 1.50, 'cat-o.png', 'Común'),
];

//Defino su id conun contador
let count = 1;
for(let g of productos){
    g.setId = count;
    count++;
}

//Obtengo las referencias del documento
const d = document;
let catalogo = d.querySelector('#catalogo');

//Instancio los productos en el documento
for(let p of productos){
    let f = d.createElement('figure')
    let img = d.createElement('img')
    img.src = `assets/img/${p.imagen}`;
    f.appendChild(img);

    let buttons = d.createElement('div');
    let a = d.createElement('a');
    a.href = '#';
    a.innerHTML = `AGREGAR`;
    let v = d.createElement('a');
    v.href = '#';
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
    let close = d.createElement('p');
    close.innerHTML = 'X';
    close.style = 'cursor: pointer;'
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
    innerDiv.appendChild(close);
    div.appendChild(innerDiv);

    div.className ='modal';

    catalogo.appendChild(div);
}