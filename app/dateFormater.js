function getDataHoraAtualFormatada() {
    var dataAtual = new Date();
    var dia = adicionarZero(dataAtual.getDate());
    var mes = adicionarZero(dataAtual.getMonth() + 1);
    var ano = dataAtual.getFullYear();
    var horas = adicionarZero(dataAtual.getHours());
    var minutos = adicionarZero(dataAtual.getMinutes());
    var segundos = adicionarZero(dataAtual.getSeconds());
    var dataHoraFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
    return dataHoraFormatada;
};

function adicionarZero(numero) {
    return numero < 10 ? '0' + numero : numero;
};