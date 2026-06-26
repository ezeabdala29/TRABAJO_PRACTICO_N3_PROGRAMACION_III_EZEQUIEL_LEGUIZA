const personas = [];

const formulario = document.getElementById('formPersona');
const tablaPersonas = document.getElementById('tablaPersonas');
const mensajePersonas = document.getElementById('mensajePersonas');

function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function formatearIMC(imc) {
  return imc.toFixed(2);
}

function clasificarIMC(imc) {
  if (imc < 18.5) {
    return 'Bajo peso';
  }

  if (imc < 25) {
    return 'Normal';
  }

  if (imc < 30) {
    return 'Sobrepeso';
  }

  return 'Obesidad';
}

function mostrarPersonas() {
  tablaPersonas.innerHTML = '';
  mensajePersonas.style.display = personas.length === 0 ? 'block' : 'none';

  personas.forEach((persona, indice) => {
    const fila = document.createElement('tr');
    const imc = calcularIMC(persona.peso, persona.altura);

    fila.innerHTML = `
      <td>${persona.nombre}</td>
      <td>${persona.apellido}</td>
      <td>${persona.edad}</td>
      <td>${persona.altura.toFixed(2)} m</td>
      <td>${persona.peso.toFixed(1)} kg</td>
      <td>${formatearIMC(imc)} - ${clasificarIMC(imc)}</td>
      <td>
        <button type="button" onclick="eliminarPersona(${indice})">Eliminar</button>
      </td>
    `;

    tablaPersonas.appendChild(fila);
  });
}

function eliminarPersona(indice) {
  personas.splice(indice, 1);
  mostrarPersonas();
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nuevaPersona = {
    nombre: document.getElementById('nombre').value.trim(),
    apellido: document.getElementById('apellido').value.trim(),
    edad: Number(document.getElementById('edad').value),
    altura: Number(document.getElementById('altura').value),
    peso: Number(document.getElementById('peso').value)
  };

  personas.push(nuevaPersona);
  formulario.reset();
  mostrarPersonas();
});

mostrarPersonas();