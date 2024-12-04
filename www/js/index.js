let peoples = {
  Dias: {
    Name: 'João Vitor Dias',
    Dia: 2,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [1, 23],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0]
  },
  Antonio: {
    Name: 'Antonio Jose Alves Viana',
    Dia: 14,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [4, 19, 27],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0]
  },
  Souza: {
    Name: 'Gabriel De Souza Lima',
    Dia: 28,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [7, 16, 30],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0]
  },
  Menezes: {
    Name: 'Matheus De Menezes Silva',
    Dia: 1,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [5, 15, 17, 29],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0]
  },
  Severino: {
    Name: 'João Severino De Lira',
    Dia: 3,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [5, 18, 28],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0]
  },
  Florisvaldo: {
    Name: 'Florisvaldo Freitas Silva',
    Dia: 4,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [20],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0]
  },
  Vitor: {
    Name: 'Vitor Oliveira Barbosa',
    Dia: 8,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [3, 21, 26],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0]
  },
  Pereira: {
    Name: 'Matheus Pereira Ramos',
    Dia: 5,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [2, 22, 24, 25],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0]
  },
  Machado: {
    Name: 'Bruno Machado Sidomo',
    Dia: 2,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [12],
    Time: 'H1',
    Count: [0, 0, 0, 0, 0]
  },
  Martins: {
    Name: 'Gabriel Martins Filho',
    Dia: 13,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [11],
    Time: 'H1',
    Count: [0, 0, 0, 0, 0]
  },
  Marcos: {
    Name: 'Marcos Vinicius De Souza',
    Dia: 7,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [9, 13],
    Time: 'H1',
    Count: [0, 0, 0, 0, 0]
  },
  Rafael: {
    Name: 'Rafael Lima De Souza',
    Dia: 4,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [9, 14],
    Time: 'H1',
    Count: [0, 0, 0, 0, 0]
  },
  Pedro: {
    Name: 'Pedro Henrique Sorrilha Cordeiro',
    Dia: 22,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [0],
    Time: 'H2',
    Count: [0, 0, 0, 0, 0]
  }
}

let escala = 6

// Função para calcular todas as folgas nos próximos dois meses
function calcularFolgas(proximoPeriodo, escala, pessoa) {
  let dataAtual = getSPTime()
  let folgas = []

  let diaInicioFolga = peoples[pessoa].Dia
  let mesInicioFolga = peoples[pessoa].Mes
  let dupla = peoples[pessoa].Dupla // Obter o valor inicial de Dupla
  let dataInicioFolga = new Date(
    dataAtual.getFullYear(),
    mesInicioFolga - 1,
    diaInicioFolga
  )

  let ultimasFolgas = []

  // Ajuste inicial para garantir que a data de início seja correta, incluindo datas anteriores
  while (dataInicioFolga <= dataAtual) {
    ultimasFolgas.push(dataInicioFolga.toDateString())

    if (dupla) {
      let dataFolga2 = new Date(dataInicioFolga)
      dataFolga2.setDate(dataInicioFolga.getDate() + 1)
      ultimasFolgas.push(dataFolga2.toDateString())
    }

    dataInicioFolga.setDate(
      dataInicioFolga.getDate() + escala + 1 + (dupla ? 1 : 0)
    )
    dupla = !dupla // Alternar entre folga simples e dupla
  }

  // Pegar apenas as últimas 2 folgas anteriores
  ultimasFolgas = ultimasFolgas.slice(-2)

  // Loop para calcular folgas para o próximo período
  while (folgas.length < proximoPeriodo) {
    let dataFolga1 = new Date(dataInicioFolga)
    folgas.push(dataFolga1.toDateString())

    if (dupla) {
      let dataFolga2 = new Date(dataInicioFolga)
      dataFolga2.setDate(dataInicioFolga.getDate() + 1)
      folgas.push(dataFolga2.toDateString())
    }

    // Atualizar a data de início para a próxima folga
    dataInicioFolga.setDate(
      dataInicioFolga.getDate() + escala + 1 + (dupla ? 1 : 0)
    )
    dupla = !dupla // Alternar entre folga simples e dupla
  }

  return [...ultimasFolgas, ...folgas]
}

// Função para verificar se hoje é um dia de folga
function isFolgaHoje(diasFolga) {
  let dataAtual = getSPTime().toDateString()
  return diasFolga.includes(dataAtual)
}

// Atualizando folgas com base na data atual
function atualizarFolgas(peoples, escala) {
  Object.keys(peoples).forEach(nome => {
    let folgas = calcularFolgas(80, escala, nome)
    peoples[nome].Folga = isFolgaHoje(folgas)
  })
}

// Função para mostrar folgas
function mostrarFolgas() {
  let nome = document.getElementById('funcionario').value
  if (!nome) {
    return
  }

  // Atualizar as folgas antes de mostrar
  atualizarFolgas(peoples, escala)

  let folgas = calcularFolgas(80, escala, nome)
  console.log(folgas) // Verifique o que está sendo retornado aqui

  // Checkagem de duplicatas
  const folgasUnicas = [...new Set(folgas)]

  // Limpar calendário anterior
  let listaDeFolgas = document.getElementById('listaDeFolgas')
  listaDeFolgas.innerHTML = ''

  // Agrupar folgas por mês e ano
  const folgasPorMesEAno = folgasUnicas.reduce((acc, folga) => {
    const data = new Date(folga)
    const ano = data.getFullYear()
    const mes = data.getMonth()
    const dia = data.getDate()

    if (!acc[ano]) {
      acc[ano] = {}
    }
    if (!acc[ano][mes]) {
      acc[ano][mes] = []
    }
    acc[ano][mes].push(dia)

    return acc
  }, {})

  // Criar calendários para os meses que possuem folgas
  for (const ano in folgasPorMesEAno) {
    for (const mes in folgasPorMesEAno[ano]) {
      const mesIndex = parseInt(mes, 10)
      const nomeMes = new Date(ano, mesIndex).toLocaleString('pt-BR', {
        month: 'long'
      })

      let mesDiv = document.createElement('div')
      mesDiv.classList.add('mes')

      let tituloMes = document.createElement('div')
      tituloMes.classList.add('mes-titulo')
      tituloMes.textContent = `${
        nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)
      } ${ano}`
      mesDiv.appendChild(tituloMes)

      let calendario = document.createElement('div')
      calendario.classList.add('calendario')

      const diasNoMes = new Date(ano, mesIndex + 1, 0).getDate()
      const folgasNoMes = folgasPorMesEAno[ano][mes]

      // Adicionar dias ao calendário
      for (let dia = 1; dia <= diasNoMes; dia++) {
        let dataStr = `${ano}-${(mesIndex + 1)
          .toString()
          .padStart(2, '0')}-${dia.toString().padStart(2, '0')}`
        let diaElemento = document.createElement('div')
        diaElemento.classList.add('dia')

        // Verificação da folga no mês correto
        if (folgasNoMes.includes(dia)) {
          diaElemento.classList.add('folga')
        }

        // Adicionar inicial do dia da semana
        const diasDaSemana = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']
        const data = new Date(dataStr)
        const diaSemana = diasDaSemana[data.getDay()]
        diaElemento.innerHTML = `<h2>${diaSemana}</h2>
        <h2>${dia.toString().padStart(2, '0')}</h2>
         `
        calendario.appendChild(diaElemento)
      }

      mesDiv.appendChild(calendario)
      listaDeFolgas.appendChild(mesDiv)
    }
  }
}

console.log(peoples)
atualizarFolgas(peoples, escala)

// Função para obter a hora atual em São Paulo
function getSPTime() {
  const now = new Date()
  const options = {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }
  const formatter = new Intl.DateTimeFormat('pt-BR', options)
  const parts = formatter.formatToParts(now)

  const year = parts.find(part => part.type === 'year').value
  const month = parts.find(part => part.type === 'month').value - 1 // mês em JavaScript é 0-indexado
  const day = parts.find(part => part.type === 'day').value
  const hour = parts.find(part => part.type === 'hour').value
  const minute = parts.find(part => part.type === 'minute').value
  const second = parts.find(part => part.type === 'second').value

  return new Date(year, month, day, hour, minute, second)
}

let Gate = document.getElementById('Gate')
let Scale = document.getElementById('Scale')

let btnGate = document.getElementById('btnGate')
let btnScale = document.getElementById('btnScale')

btnGate.addEventListener('click', function () {
  btnScale.style.background = 'white'
  btnGate.style.background = 'rgb(0, 130, 210)'
  btnScale.style.color = 'black'
  btnGate.style.color = 'white'

  Scale.classList.add('hidden')
  Gate.classList.remove('hidden')
})

btnScale.addEventListener('click', function () {
  btnScale.style.background = 'rgb(0, 130, 210)'
  btnGate.style.background = 'white'
  btnGate.style.color = 'black'
  btnScale.style.color = 'white'

  Gate.classList.add('hidden')
  Scale.classList.remove('hidden')
})

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyBR0io-r_snZTWy1pe8A0dsb4awBpANDxs',
  authDomain: 'escala-pnae.firebaseapp.com',
  databaseURL: 'https://escala-pnae-default-rtdb.firebaseio.com',
  projectId: 'escala-pnae',
  storageBucket: 'escala-pnae.firebasestorage.app',
  messagingSenderId: '289230851590',
  appId: '1:289230851590:web:a638d6c6a8409d65803d87'
})

var database = firebase.database()

// Mudar para deviceready
const lastOpenRef = database.ref('app/lastOpen')

function recordAppOpen() {
  const now = getSPTime()
  lastOpenRef.set({
    lastOpen: now
  })
}

// Registrar quando o app é aberto
recordAppOpen()

// Função para verificar o horário e executar a tarefa
function scheduleTask() {
  lastOpenRef
    .once('value')
    .then(snapshot => {
      const lastOpenData = snapshot.val()
      if (lastOpenData) {
        const lastOpenTime = new Date(lastOpenData.lastOpen)
        const now = new Date(getSPTime())
        const oneDayMillis = 24 * 60 * 60 * 1000

        if (now - lastOpenTime > oneDayMillis || now.getHours() >= 1) {
          distribuirPessoas()
        }
      } else {
        distribuirPessoas()
      }
    })
    .catch(error => {
      console.error('Erro ao ler dados: ', error)
    })
}

// Chamar a função scheduleTask quando o app é aberto
scheduleTask()

function distribuirPessoas() {
  let space0930 = Array.from(document.querySelectorAll('.space0930'))
  let space0962 = Array.from(document.querySelectorAll('.space0962'))
  let space0950 = Array.from(document.querySelectorAll('.space0950'))
  let space0958 = Array.from(document.querySelectorAll('.space0958'))
  let space0906 = Array.from(document.querySelectorAll('.space0906'))

  let assignments = {
    930: [],
    962: [],
    950: [],
    958: [],
    906: []
  }

  let assignedNames = new Set() // Set para verificar nomes já alocados

  for (let person in peoples) {
    if (
      !peoples[person].Folga &&
      !peoples[person].GateMaker.includes(new Date().getDate())
    ) {
      let name = peoples[person].Name
      let time = peoples[person].Time

      // Verificar se o nome já foi alocado
      if (assignedNames.has(name)) continue

      if (time === 'H1' && (space0930.length > 0 || space0962.length > 0)) {
        if (space0930.length > 0) {
          let space = space0930.find(s => !s.textContent)
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['930'].push(name)
            assignedNames.add(name)
            continue
          }
        }

        if (space0962.length > 0) {
          let space = space0962.find(s => !s.textContent)
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['962'].push(name)
            assignedNames.add(name)
            continue
          }
        }
      }

      if (
        time === 'H3' &&
        (space0950.length > 0 || space0958.length > 0 || space0906.length > 0)
      ) {
        if (space0950.length > 0) {
          let space = space0950.find(s => !s.textContent)
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['950'].push(name)
            assignedNames.add(name)
            continue
          }
        }

        if (space0958.length > 0) {
          let space = space0958.find(s => !s.textContent)
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['958'].push(name)
            assignedNames.add(name)
            continue
          }
        }

        if (space0906.length > 0) {
          let space = space0906.find(s => !s.textContent)
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['906'].push(name)
            assignedNames.add(name)
            continue
          }
        }
      }

      if (
        time === 'H2' &&
        (space0930.length > 0 ||
          space0962.length > 0 ||
          space0950.length > 0 ||
          space0958.length > 0)
      ) {
        if (space0930.length > 0) {
          let space = space0930.find(s => !s.textContent)
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['930'].push(name)
            assignedNames.add(name)
            continue
          }
        }

        if (space0962.length > 0) {
          let space = space0962.find(s => !s.textContent)
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['962'].push(name)
            assignedNames.add(name)
            continue
          }
        }

        if (space0950.length > 0) {
          let space = space0950.find(s => !s.textContent)
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['950'].push(name)
            assignedNames.add(name)
            continue
          }
        }

        if (space0958.length > 0) {
          let space = space0958.find(s => !s.textContent)
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['958'].push(name)
            assignedNames.add(name)
            continue
          }
        }
      }
    }
  }

  // Salvar as atribuições no Firebase
  salvarAssignments(assignments)
}

function salvarLog(person, flightIndex) {
  const now = new Date().toISOString()
  firebase.database().ref(`app/logs/${person}`).push({
    date: now,
    flight: flightIndex
  })
}

function salvarAssignments(assignments) {
  // Contar o número total de nomes não vazios em todas as listas de assignments
  let totalNomes = Object.values(assignments).reduce((acc, list) => {
    return acc + list.filter(name => name.trim() !== '').length
  }, 0)

  // Verificar se há pelo menos 3 nomes não vazios antes de salvar
  if (totalNomes >= 3) {
    const today = new Date().toISOString().slice(0, 10) // Formato YYYY-MM-DD
    firebase.database().ref(`app/assignments/${today}`).set(assignments)
    console.log('salvo', assignments) // Log adicional para verificação
  } else {
    console.log('Não salvo - número insuficiente de nomes não vazios')
  }
}

/*
let updateAssignments = document.getElementById('updateAssignments')

// Adicione o event listener para o botão
updateAssignments.addEventListener('click', function () {
  mudarEscalaHoje()
})*/

// Função para mudar a escala de hoje e atualizar no banco de dados
function mudarEscalaHoje() {
  let space0930 = Array.from(document.querySelectorAll('.space0930'))
  let space0962 = Array.from(document.querySelectorAll('.space0962'))
  let space0950 = Array.from(document.querySelectorAll('.space0950'))
  let space0958 = Array.from(document.querySelectorAll('.space0958'))
  let space0906 = Array.from(document.querySelectorAll('.space0906'))

  let assignments = {
    930: [],
    962: [],
    950: [],
    958: [],
    906: []
  }

  let assignedNames = new Set() // Set para verificar nomes já alocados
  let pessoasArray = Object.keys(peoples).map(key => peoples[key])

  // Aleatorizar a lista de pessoas
  pessoasArray = pessoasArray.sort(() => Math.random() - 0.5)

  for (let person of pessoasArray) {
    if (!person.Folga && !person.GateMaker.includes(new Date().getDate())) {
      let name = person.Name
      let time = person.Time

      // Verificar se o nome já foi alocado
      if (assignedNames.has(name)) continue

      if (time === 'H1' && (space0930.length > 0 || space0962.length > 0)) {
        if (space0930.length > 0) {
          let space = space0930.shift()
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['930'].push(name)
            assignedNames.add(name)
            continue
          }
        }

        if (space0962.length > 0) {
          let space = space0962.shift()
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['962'].push(name)
            assignedNames.add(name)
            continue
          }
        }
      }

      if (
        time === 'H3' &&
        (space0950.length > 0 || space0958.length > 0 || space0906.length > 0)
      ) {
        if (space0950.length > 0) {
          let space = space0950.shift()
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['950'].push(name)
            assignedNames.add(name)
            continue
          }
        }

        if (space0958.length > 0) {
          let space = space0958.shift()
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['958'].push(name)
            assignedNames.add(name)
            continue
          }
        }

        if (space0906.length > 0) {
          let space = space0906.shift()
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['906'].push(name)
            assignedNames.add(name)
            continue
          }
        }
      }

      if (
        time === 'H2' &&
        (space0930.length > 0 ||
          space0962.length > 0 ||
          space0950.length > 0 ||
          space0958.length > 0)
      ) {
        if (space0930.length > 0) {
          let space = space0930.shift()
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['930'].push(name)
            assignedNames.add(name)
            continue
          }
        }

        if (space0962.length > 0) {
          let space = space0962.shift()
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['962'].push(name)
            assignedNames.add(name)
            continue
          }
        }

        if (space0950.length > 0) {
          let space = space0950.shift()
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['950'].push(name)
            assignedNames.add(name)
            continue
          }
        }

        if (space0958.length > 0) {
          let space = space0958.shift()
          if (space) {
            space.innerHTML = `<h2>${name}</h2>`
            assignments['958'].push(name)
            assignedNames.add(name)
            continue
          }
        }
      }
    }
  }

  // Logs para depuração
  console.log('Assignments:', assignments)

  // Salvar as novas assignações no banco de dados
  salvarAssignments(assignments)
}

function populatePeopleList(peoples) {
  const today = getSPTime()
  const todayDay = today.getDate()
  const todayMonth = today.getMonth() // Lembre-se que os meses são 0-indexados

  for (let key in peoples) {
    let person = peoples[key]
    let fullName = person.Name

    // Verifica se hoje é o dia de montar portão para essa pessoa
    if (person.GateMaker.includes(todayDay)) {
      fullName += ' '
      // Adiciona o "(G)" em azul escuro
      fullName += `<span style="color: #00152B;">(G)</span>`
    }

    if (!person.Folga) {
      let listClass = `list${person.Time}`
      let listDiv = document.querySelector(`.${listClass}`)

      if (listDiv) {
        let h3 = document.createElement('h3')
        // Insere o nome com HTML
        h3.innerHTML = fullName
        listDiv.appendChild(h3)
      }
    } else {
      // Adiciona à lista de folgas
      let listFolgaDiv = document.querySelector('.listFolga')
      if (listFolgaDiv) {
        let h3 = document.createElement('h3')
        // Insere o nome com HTML
        h3.innerHTML = fullName
        listFolgaDiv.appendChild(h3)
      }
    }
  }
}

populatePeopleList(peoples)

let openMenu = document.getElementById('openMenu')
let peoplesOnWork = document.querySelector('.peoplesOnWork')
let bars = openMenu.querySelectorAll('.bar')

openMenu.addEventListener('click', function () {
  if (peoplesOnWork.classList.contains('close')) {
    peoplesOnWork.classList.remove('close')

    bars.forEach(bar => {
      bar.style.background = 'white'
    })
  } else {
    peoplesOnWork.classList.add('close')

    bars.forEach(bar => {
      bar.style.background = '#0082d2'
    })
  }
})
