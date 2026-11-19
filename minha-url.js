function checarProblemas(url, linkCompleto) {
  const problemas = [];
  if (url.protocol !== "https:") problemas.push("Não usa HTTPS (conexão sem criptografia)");
  if (linkCompleto.includes("@")) problemas.push("Contém '@' no meio do endereço (técnica de disfarce)");
  if (url.hostname.includes("xn--")) problemas.push("Usa punycode (xn--), possível domínio internacional falsificado");
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(url.hostname)) problemas.push("Usa endereço IP direto em vez de nome de domínio");
  if (url.hostname.split(".").length > 3) problemas.push("Possui excesso de subdomínios");
  return problemas;
}

function testarUrl() {
  const campo = document.getElementById("campo-url");
  const saida = document.getElementById("resultado-url");
  let texto = campo.value.trim();

  if (!texto) {
    saida.style.color = "#facc15";
    saida.textContent = "Digite ou cole um link primeiro para testar.";
    return;
  }

  if (!texto.startsWith("http://") && !texto.startsWith("https://")) {
    texto = "http://" + texto;
  }

  try {
    const url = new URL(texto);
    const problemas = checarProblemas(url, texto);
    if (problemas.length === 0) {
      saida.style.color = "#4ade80";
      saida.textContent = "Nenhum sinal suspeito encontrado neste link.";
    } else {
      saida.style.color = "#f87171";
      saida.innerHTML = "<strong>Atenção — sinais suspeitos encontrados:</strong><br>• " + problemas.join("<br>• ");
    }
  } catch (e) {
    saida.style.color = "#facc15";
    saida.textContent = "Endereço inválido. Verifique o formato do link.";
  }
}
