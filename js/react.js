const e = React.createElement;
const useState = React.useState;

function calcularIMC(peso, altura) {
  return peso / (altura * altura);
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

function FormularioPersona(props) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');

  function guardarPersona(evento) {
    evento.preventDefault();

    const persona = {
      nombre: nombre,
      apellido: apellido,
      edad: Number(edad),
      altura: Number(altura),
      peso: Number(peso)
    };

    props.agregarPersona(persona);

    setNombre('');
    setApellido('');
    setEdad('');
    setAltura('');
    setPeso('');
  }

  return e(
    'section',
    { className: 'panel' },
    e('h2', null, 'Agregar persona'),
    e(
      'form',
      { onSubmit: guardarPersona },
      e(
        'label',
        null,
        'Nombre',
        e('input', {
          type: 'text',
          value: nombre,
          onChange: function(evento) {
            setNombre(evento.target.value);
          },
          required: true
        })
      ),
      e(
        'label',
        null,
        'Apellido',
        e('input', {
          type: 'text',
          value: apellido,
          onChange: function(evento) {
            setApellido(evento.target.value);
          },
          required: true
        })
      ),
      e(
        'label',
        null,
        'Edad',
        e('input', {
          type: 'number',
          min: '1',
          value: edad,
          onChange: function(evento) {
            setEdad(evento.target.value);
          },
          required: true
        })
      ),
      e(
        'label',
        null,
        'Altura (m)',
        e('input', {
          type: 'number',
          min: '0.5',
          step: '0.01',
          value: altura,
          onChange: function(evento) {
            setAltura(evento.target.value);
          },
          required: true
        })
      ),
      e(
        'label',
        null,
        'Peso (kg)',
        e('input', {
          type: 'number',
          min: '1',
          step: '0.1',
          value: peso,
          onChange: function(evento) {
            setPeso(evento.target.value);
          },
          required: true
        })
      ),
      e(
        'div',
        { className: 'form-acciones' },
        e('button', { type: 'submit' }, 'Agregar persona')
      )
    )
  );
}

function TablaPersonas(props) {
  return e(
    'section',
    { className: 'panel' },
    e('h2', null, 'Tabla de personas'),
    props.personas.length === 0
      ? e('p', { className: 'mensaje-vacio' }, 'Todavia no hay personas cargadas')
      : null,
    e(
      'div',
      { className: 'tabla-contenedor' },
      e(
        'table',
        null,
        e(
          'thead',
          null,
          e(
            'tr',
            null,
            e('th', null, 'Nombre'),
            e('th', null, 'Apellido'),
            e('th', null, 'Edad'),
            e('th', null, 'Altura'),
            e('th', null, 'Peso'),
            e('th', null, 'IMC'),
            e('th', null, 'Accion')
          )
        ),
        e(
          'tbody',
          null,
          props.personas.map(function(persona, indice) {
            const imc = calcularIMC(persona.peso, persona.altura);

            return e(
              'tr',
              { key: indice },
              e('td', null, persona.nombre),
              e('td', null, persona.apellido),
              e('td', null, persona.edad),
              e('td', null, persona.altura.toFixed(2) + ' m'),
              e('td', null, persona.peso.toFixed(1) + ' kg'),
              e('td', null, imc.toFixed(2) + ' - ' + clasificarIMC(imc)),
              e(
                'td',
                null,
                e(
                  'button',
                  {
                    type: 'button',
                    onClick: function() {
                      props.eliminarPersona(indice);
                    }
                  },
                  'Eliminar'
                )
              )
            );
          })
        )
      )
    )
  );
}

function App() {
  const [personas, setPersonas] = useState([]);

  function agregarPersona(persona) {
    setPersonas(personas.concat(persona));
  }

  function eliminarPersona(indiceElegido) {
    const personasFiltradas = personas.filter(function(persona, indice) {
      return indice !== indiceElegido;
    });

    setPersonas(personasFiltradas);
  }

  return e(
    React.Fragment,
    null,
    e(FormularioPersona, { agregarPersona: agregarPersona }),
    e(TablaPersonas, {
      personas: personas,
      eliminarPersona: eliminarPersona
    })
  );
}

const raiz = ReactDOM.createRoot(document.getElementById('root'));
raiz.render(e(App));