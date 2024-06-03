var inss;
var salarioLiquido;
var deducao;
var irrf;
var primeiraFaixa;
var segundaFaixa;
var terceiraFaixa;
var quartaFaixa;

function baseInss(salario, descontos) {
    if (salario <= 1412) {
        inss = salario * 0.075;
        salarioLiquido = salario - inss - descontos;
    } else if (salario >= 1412.01 && salario <= 2666.68) {
        deducao = 21.18
        inss = (salario * 0.09) - deducao;
        salarioLiquido = salario - inss - descontos;
    } else if (salario >= 2666.68 && salario <= 4000.03) {
        deducao = 101.18;
        inss = (salario * 0.12) - deducao;
        salarioLiquido = salario - inss - descontos;
    } else if (salario >= 4000.04 && salario <= 7786.02) {
        deducao = 181.18
        inss = (salario * 0.14) - deducao;
        salarioLiquido = salario - inss - descontos;
    } else if (salario > 7786.02) {
        primeiraFaixa = 105.90
        segundaFaixa = (2666.68 - 1412) * 0.09
        terceiraFaixa = (4000.03 - 2666.69) * 0.12
        quartaFaixa = (7786.02 - 4000.04) * 0.14
        inss = primeiraFaixa + segundaFaixa + terceiraFaixa + quartaFaixa
        salarioLiquido = salario - inss - descontos;
    }
}

function baseIrrf(salario, descontos) {
    if (salario <= 2259.20) {
        irrf = "Isento"
        salarioLiquido = salario - inss - descontos - Number(0.00);
    } else if (salario >= 2259.21 && salario <= 2826.65) {
        deducao = 169.44
        irrf = (salario - inss) * 0.075 - deducao;
        salarioLiquido = salario - inss - descontos - irrf;
    } else if (salario >= 2826.66 && salario <= 3751.05) {
        deducao = 381.44
        irrf = (salario - inss) * 0.15 - deducao;
        salarioLiquido = salario - inss - descontos - irrf
    } else if (salario >= 3751.06 && salario <= 4664.68) {
        deducao = 662.77
        irrf = (salario - inss) * 0.225 - deducao;
        salarioLiquido = salario - inss - descontos - irrf
    }
    else if (salario >= 4664.68) {
        deducao = 896.00
        irrf = (salario - inss) * 0.275 - deducao;
        salarioLiquido = salario - inss - descontos - irrf
    }
}


document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault();

    var nome = document.querySelector('input[name="nome"]').value;
    var salario = parseFloat(document.querySelector('input[name="salario"]').value);
    var descontos = parseFloat(document.querySelector('input[name="descontos"]').value);
    // Chamando as funções de cálculo
    baseInss(salario, descontos);
    baseIrrf(salario, descontos);

    // Exibindo os resultados na tabela
    document.getElementById('nome_output').innerText = nome;
    document.getElementById('salario_output').innerText = salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('descontos_output').innerText = descontos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('inss_output').innerText = inss.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('irrf_output').innerText = irrf === "Isento" ? irrf : irrf.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('salarioLiquido_output').innerText = salarioLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('salario_output').style.color = salario < 0 ? 'red' : 'blue';
    document.getElementById('descontos_output').style.color = 'red' ;
    document.getElementById('inss_output').style.color = 'red';
    document.getElementById('irrf_output').style.color = irrf > 0 ? 'red' : 'blue';
    document.getElementById('salarioLiquido_output').style.color = salarioLiquido < 0 ? 'red' : 'blue';
});