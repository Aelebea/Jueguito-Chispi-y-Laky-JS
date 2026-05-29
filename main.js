// 1. CONTROL DE LA PANTALLA DE INICIO (index.html)
function selectPath(path) {
  if (path === "laky") {
    window.open("laky.html", "_self");
  } else if (path === "chispi") {
    window.open("chispi.html", "_self");
  }
}

// 2A. NAVEGACIÓN DESDE LA PANTALLA DE CHISPI (chispi.html)
function navegarChispi(destino) {
  if (destino === "norte") {
    window.open("chispi_norte.html", "_self");
  } else if (destino === "sur") {
    window.open("chispi_sur.html", "_self");
  } else if (destino === "parque") {
    window.open("chispi_escaleras.html", "_self");
  }
}

// 2B. NAVEGACIÓN DESDE LA PANTALLA DE LAKY (laky.html)
function navegarLaky(destino) {
  if (destino === "norte") {
    window.open("laky_norte.html", "_self");
  } else if (destino === "sur") {
    window.open("laky_sur.html", "_self");
  } else if (destino === "parque") {
    window.open("laky_volando.html", "_self");
  }
}

// 3. LÓGICA DE BÚSQUEDA INTERACTIVA (Compartida entre Norte de Chispi y Laky)
function buscarObjeto(zona) {
  var textoDialogo = document.getElementById("dialogue-text");
  var itemInventario = document.getElementById("item-actual");
  var pantallaJuego = document.getElementById("game-screen-bg");

  // Detectamos automáticamente si la URL actual pertenece a la rama de Laky
  var esLaky = window.location.href.includes("laky");
  var nombreItem = esLaky ? "🎨 Dibujo" : "🦴 Juguete";

  // Si ya encontró el objeto, bloqueamos que mire otra cosa
  if (
    localStorage.getItem("jugueteChispi") === "encontrado" &&
    zona !== "suelo"
  ) {
    return;
  }

  if (pantallaJuego) {
    pantallaJuego.className = "game-screen";
  }

  // 🌿 ZONA DE LA ENTRADA / MATORRAL
  if (zona === "matorral") {
    if (esLaky) {
      textoDialogo.innerText =
        "Laky investiga entre el frondoso arbusto, pero... aquí tampoco está lo que buscamos...";
    } else {
      textoDialogo.innerText =
        "Se acerca a la puerta de la casa, huele la entrada y... ¡aparecen unas mariposas! qué bonito, pero... no está lo que buscamos. ¡Sigue clicando sobre la imagen!";
    }

    if (pantallaJuego) {
      pantallaJuego.classList.add(
        esLaky ? "rama-norte-matorral-laky" : "rama-norte-puerta",
      );
    }

    // 🌳 ZONA DEL ÁRBOL
  } else if (zona === "arbol") {
    if (esLaky) {
      textoDialogo.innerText =
        "Laky se posa en una rama del árbol... mira alrededor, pero aquí no está lo que está buscando.";
    } else {
      textoDialogo.innerText =
        "Chispi se acerca al árbol... Un pájaro le llama la atención, pero aquí no está lo que está buscando. ¡Sigue clicando sobre la imagen!";
    }

    if (pantallaJuego) {
      pantallaJuego.classList.add(
        esLaky ? "rama-norte-arbol-laky" : "rama-norte-arbol",
      );
    }

    // 🐾 ZONA DEL SUELO (OBJETO CLAVE)
  } else if (zona === "suelo") {
    localStorage.setItem("jugueteChispi", "encontrado");

    if (pantallaJuego) {
      pantallaJuego.classList.add(
        esLaky ? "rama-norte-encontrado-laky" : "rama-norte-encontrado",
      );
    }

    if (esLaky) {
      textoDialogo.innerText =
        "¡SÍ! Resguardado bajo las raíces del árbol, encuentras el diario de Alba, con el dibujo que le hizo a Laky cuando tenía 12 años. ¡Lo guardamos!";
    } else {
      textoDialogo.innerText =
        "¡SÍ! Al apartar unas piedras en el suelo, encuentras el juguete favorito de Chispi. ¡Lo guardamos en el inventario!";
    }

    if (itemInventario) {
      itemInventario.innerText = nombreItem;
    }

    // Ejecutamos el bucle bonus exigido en la nota 3 para que se vea por consola
    revisarHistorialConsola();

    alert("¡LO ENCONTRASTE!");
  }
}

// 4. FUNCIÓN PARA REINICIAR EL JUEGO
function reiniciarJuego() {
  localStorage.clear();
  window.open("index.html", "_self");
}

// ── 🌟 BONUS EXTRA: Función exigida en la nota 3 para demostrar el uso del bucle FOR basado en .length
function revisarHistorialConsola() {
  console.log("--- REVISANDO ELEMENTOS DEL INVENTARIO (Bucle For) ---");
  for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    const valor = localStorage.getItem(clave);
    console.log(`Clave guardada: ${clave} -> Valor: ${valor}`);
  }
}

// ── 🎨 EFECTO DE REVELADO AUTOMÁTICO (Para el final de Chispi)
if (window.location.href.includes("chispi_escaleras.html")) {
  window.addEventListener("load", function () {
    if (localStorage.getItem("jugueteChispi") === "encontrado") {
      var pantallaJuego = document.getElementById("game-screen-bg");

      setTimeout(function () {
        if (pantallaJuego) {
          pantallaJuego.classList.add("rama-final-bueno-revelada");
        }
      }, 1000);
    }
  });
}
