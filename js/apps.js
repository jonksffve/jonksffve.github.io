const form = document.querySelector('form')

const epicos = {
    acero: 0,
    evil: 0,
    moon: 0,
    escama: 0,
    setEscama(a) {
        this.escama = a
    },
    setAcero(a) {
        this.acero = this.acero + a
    },
    setEvil(a) {
        this.evil = this.evil + a
    },
    setMoon(a) {
        this.moon = this.moon + a
    },
    getEscama() {
        return this.escama
    },
    getAcero() {
        return this.acero
    },
    getEvil() {
        return this.evil
    },
    getMoon() {
        return this.moon
    },
}

const raros = {
    acero: 0,
    evil: 0,
    moon: 0,
    getAcero() {
        return this.acero
    },
    getEvil() {
        return this.evil
    },
    getMoon() {
        return this.moon
    },
    setAcero(a) {
        this.acero = this.acero + a
    },
    setEvil(a) {
        this.evil = this.evil + a
    },
    setMoon(a) {
        this.moon = this.moon + a
    }
}

const uc = {
    acero: 0,
    evil: 0,
    moon: 0,
    setAcero(a) {
        this.acero = this.acero + a
    },
    setEvil(a) {
        this.evil = this.evil + a
    },
    setMoon(a) {
        this.moon = this.moon + a
    },
    getAcero() {
        return this.acero
    },
    getEvil() {
        return this.evil
    },
    getMoon() {
        return this.moon
    },
}

const precios = {
    cobre: 0,
    polvo: 0,
    darkSteel: 0,
    addCobre(a) {
        this.cobre = this.cobre + a
    },
    addPolvo(a) {
        this.polvo = this.polvo + a
    },
    addDarksteel(a) {
        this.darkSteel = this.darkSteel + a
    }
}

function subirRaro(input) {
    const cantidadPosible = Math.trunc(input.value / 10)
    const resto = input.value - (cantidadPosible * 10)

    switch (input.dataset.type) {
        case 'acero':
            raros.setAcero(cantidadPosible)
            uc.setAcero(resto)
            break
        case 'evil':
            raros.setEvil(cantidadPosible)
            uc.setEvil(resto)
            break
        case 'moon':
            raros.setMoon(cantidadPosible)
            uc.setMoon(resto)
            break
    }
}

function subirEpico(valor, type) {
    const cantidadPosible = Math.trunc(valor / 10)
    const resto = valor - (cantidadPosible * 10)

    if (cantidadPosible >= 1) {
        switch (type) {
            case 'acero':
                epicos.setAcero(cantidadPosible)
                raros.acero = resto
                break
            case 'evil':
                epicos.setEvil(cantidadPosible)
                raros.evil = resto
                break
            case 'moon':
                epicos.setMoon(cantidadPosible)
                raros.moon = resto
                break
        }
    }
}

function calcularCosto(valor, type) {
    const cantidadPosible = Math.trunc(valor / 10)

    if (cantidadPosible >= 1) {
        if (type === "comun") {
            precios.addCobre(cantidadPosible * 2000)
            precios.addPolvo(cantidadPosible * 2)
            precios.addDarksteel(cantidadPosible * 1000)
        } else if (type === "raro") {
            precios.addCobre(cantidadPosible * 20000)
            precios.addPolvo(cantidadPosible * 25)
            precios.addDarksteel(cantidadPosible * 5000)
        }
    }
}


function calcularComunes() {
    const comunesInputs = document.querySelector("div[name='img-comunes']").querySelectorAll('input')

    comunesInputs.forEach(input => {
        if (input.value != "" && input.value > 0) {
            calcularCosto(input.value, 'comun')
            subirRaro(input)
        }
    })

}

function calcularRaros() {
    const rarosInputs = document.querySelector("div[name='img-raras']").querySelectorAll('input')

    rarosInputs.forEach(input => {
        switch (input.dataset.type) {
            case 'acero':
                let acero = raros.getAcero()
                const aceroInput = parseInt(input.value)
                if (aceroInput != "" && aceroInput > 0) {
                    acero = acero + aceroInput
                }
                calcularCosto(acero, 'raro')
                subirEpico(acero, 'acero')
                break
            case 'evil':
                let evil = raros.getEvil()
                const evilInput = parseInt(input.value)
                if (evilInput != "" && evilInput > 0) {
                    evil = evil + evilInput
                }
                calcularCosto(evil, 'raro')
                subirEpico(evil, 'evil')
                break
            case 'moon':
                let moon = raros.getMoon()
                const moonInput = parseInt(input.value)
                if (moonInput != "" && moonInput > 0) {
                    moon = moon + moonInput
                }
                calcularCosto(moon, 'raro')
                subirEpico(moon, 'moon')
                break
        }
    })

}

function renderData() {
    const textoPrecios = document.querySelector('#precios').querySelectorAll('span')
    const cantidades = document.querySelectorAll('strong')

    textoPrecios[0].innerText = new Intl.NumberFormat().format(precios.cobre)
    textoPrecios[1].innerText = new Intl.NumberFormat().format(precios.polvo)
    textoPrecios[2].innerText = new Intl.NumberFormat().format(precios.darkSteel)

    cantidades[0].innerText = epicos.getAcero()
    cantidades[1].innerText = epicos.getEvil()
    cantidades[2].innerText = epicos.getMoon()
    cantidades[3].innerText = epicos.getEscama()
    cantidades[4].innerText = raros.getAcero()
    cantidades[5].innerText = raros.getEvil()
    cantidades[6].innerText = raros.getMoon()
    cantidades[7].innerText = uc.getAcero()
    cantidades[8].innerText = uc.getEvil()
    cantidades[9].innerText = uc.getMoon()
}

function clearData() {
    precios.cobre = 0
    precios.darkSteel = 0
    precios.polvo = 0
    raros.acero = 0
    raros.evil = 0
    raros.moon = 0
    epicos.acero = 0
    epicos.evil = 0
    epicos.moon = 0
    epicos.escama = 0
    uc.acero = 0
    uc.evil = 0
    uc.moon = 0
}

function calcularProgreso() {
    const progresoAcero = (epicos.getAcero() * 100) / 300
    const progresoEvil = (epicos.getEvil() * 100) / 100
    const progresoMoon = (epicos.getMoon() * 100) / 100
    const progresoEscama = (epicos.getEscama() * 100)

    const progresoTotal = (progresoAcero * 0.25) + (progresoEvil * 0.25) + (progresoMoon * 0.25) + (progresoEscama * 0.25)

    const barra = document.querySelector('progress')
    barra.setAttribute('value', progresoTotal)
}

function actualizarEpicos() {
    const epicosInputs = document.querySelector("div[name='img-epicas']").querySelectorAll('input')
    const epicosSelect = document.querySelector("div[name='img-epicas']").querySelector('select')

    epicosInputs.forEach(input => {
        if (input.value != "" && input.value > 0) {
            switch (input.dataset.type) {
                case 'acero':
                    epicos.setAcero(parseInt(input.value))
                    break
                case 'evil':
                    epicos.setEvil(parseInt(input.value))
                    break
                case 'moon':
                    epicos.setMoon(parseInt(input.value))
                    break
            }
        }
    })

    if (epicosSelect.options[epicosSelect.selectedIndex].value === "1") {
        epicos.setEscama(1)
    }
}

form.addEventListener('submit', e => {
    e.preventDefault()
    calcularComunes()
    calcularRaros()
    actualizarEpicos()
    calcularProgreso()
    renderData()
    clearData()
})