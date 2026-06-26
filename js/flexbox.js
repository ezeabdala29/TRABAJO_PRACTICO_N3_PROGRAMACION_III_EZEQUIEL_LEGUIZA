const autos = [
  {
    nombre: 'Skyline',
    hitbox: 'Hybrid',
    puntaje: 4,
    descripcion: 'Auto rapido y con buen diseno.'
  },
  {
    nombre: 'Fennec',
    hitbox: 'Octane',
    puntaje: 5,
    descripcion: 'Muy usado porque se siente comodo para controlar.'
  },
  {
    nombre: 'Breakout',
    hitbox: 'Breakout',
    puntaje: 2,
    descripcion: 'Es mas alargado y sirve para pegarle distinto a la pelota.'
  },
  {
    nombre: 'McLaren',
    hitbox: 'Dominus',
    puntaje: 3,
    descripcion: 'Tiene estilo de auto deportivo.'
  },
  {
    nombre: 'Octane',
    hitbox: 'Octane',
    puntaje: 5,
    descripcion: 'Es el auto mas clasico de Rocket League.'
  },
  {
    nombre: 'Dominus',
    hitbox: 'Dominus',
    puntaje: 4,
    descripcion: 'Es bajo, largo y bastante usado para tiros fuertes.'
  }
];

let autosMostrados = autos;

const contenedor = document.getElementById('contenedorTarjetas');
const btnOrdenar = document.getElementById('btnOrdenar');
const btnOctane = document.getElementById('btnOctane');
const btnRestaurar = document.getElementById('btnRestaurar');

function mostrarAutos() {
  contenedor.innerHTML = '';

  autosMostrados.forEach(function(auto) {
    contenedor.innerHTML += `
      <article class="tarjeta">
        <h3>${auto.nombre}</h3>
        <span class="etiqueta">${auto.hitbox}</span>
        <p>${auto.descripcion}</p>
        <p><strong>Puntaje:</strong> ${auto.puntaje}/5</p>
      </article>
    `;
  });
}

btnOrdenar.addEventListener('click', function() {
  autosMostrados = [...autos].sort(function(a, b) {
    return b.puntaje - a.puntaje;
  });

  mostrarAutos();
});

btnOctane.addEventListener('click', function() {
  autosMostrados = autos.filter(function(auto) {
    return auto.hitbox === 'Octane';
  });

  mostrarAutos();
});

btnRestaurar.addEventListener('click', function() {
  autosMostrados = autos;
  mostrarAutos();
});

mostrarAutos();