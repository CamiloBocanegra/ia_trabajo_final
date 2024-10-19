let saldo = 1000;
let usuarioValido = { user: "cliente", pin: "1234" };

function login() {
    const user = document.getElementById("user").value;
    const pin = document.getElementById("pin").value;
    
    if (user === usuarioValido.user && pin === usuarioValido.pin) {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("atm-section").classList.remove("hidden");
        document.getElementById("welcome").innerText = `Bienvenido, ${user}`;
    } else {
        document.getElementById("message").innerText = "Usuario o PIN incorrecto";
    }
}

function consultarSaldo() {
    document.getElementById("balance").innerText = `Saldo actual: $${saldo}`;
}

function retirar() {
    mostrarInputMonto("Retirar");
}

function consignar() {
    mostrarInputMonto("Consignar");
}

function mostrarInputMonto(operacion) {
    document.getElementById("balance").innerText = "";
    document.getElementById("amount").classList.remove("hidden");
    document.getElementById("confirm-btn").classList.remove("hidden");
    document.getElementById("confirm-btn").setAttribute("data-operacion", operacion);
}

function confirmarOperacion() {
    const monto = parseFloat(document.getElementById("amount").value);
    const operacion = document.getElementById("confirm-btn").getAttribute("data-operacion");

    if (isNaN(monto) || monto <= 0) {
        document.getElementById("message").innerText = "Por favor ingrese un monto válido.";
        return;
    }

    if (operacion === "Retirar") {
        if (monto > saldo) {
            document.getElementById("message").innerText = "Saldo insuficiente.";
        } else {
            saldo -= monto;
            document.getElementById("message").innerText = `Ha retirado $${monto}.`;
        }
    } else if (operacion === "Consignar") {
        saldo += monto;
        document.getElementById("message").innerText = `Ha consignado $${monto}.`;
    }

    document.getElementById("balance").innerText = `Saldo actual: $${saldo}`;
    limpiarOperacion();
}

function limpiarOperacion() {
    document.getElementById("amount").value = "";
    document.getElementById("amount").classList.add("hidden");
    document.getElementById("confirm-btn").classList.add("hidden");
    document.getElementById("message").innerText = "";
}

function salir() {
    document.getElementById("atm-section").classList.add("hidden");
    document.getElementById("login-section").classList.remove("hidden");
    document.getElementById("user").value = "";
    document.getElementById("pin").value = "";
    document.getElementById("message").innerText = "Gracias por usar nuestro servicio.";
}
