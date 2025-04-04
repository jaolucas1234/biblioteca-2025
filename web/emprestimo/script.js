url = "http://localhost:3001";

//Objetos tipo formulário do DOM
const detalhes = document.querySelector("#detalhes form");
const cadastro = document.querySelector("#cadastro form");

//Obter títulos da API
fetch(url)
    .then((res) => res.json())
    .then((dados) => {
        document.querySelector("title").innerHTML = dados.titulo;
        document.querySelector("header h1").innerHTML = dados.titulo;
    })

//Enviar dados de cadastro para a API
cadastro.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = {
        alunoRa: cadastro.alunoRa.value,
        livroId: Number(cadastro.livroId.value)
    }
    fetch(url + "/emprestimos", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then((res) => res.status)
        .then((status) => {
            if (status == 201) {
                window.location.reload();
            } else {
                alert("Erro ao enviar dados para a API!");
            }
        });
});

const botaoCadastrar = document.querySelector("nav button"); // botão "Cadastrar" do menu
const modalCadastro = document.getElementById("cadastro");
const modalDetalhes = document.getElementById("detalhes");


const botoesFechar = document.querySelectorAll(".janela > div > button");


botaoCadastrar.addEventListener("click", () => {
    modalCadastro.classList.remove("oculto");
});


botoesFechar.forEach(botao => {
    botao.addEventListener("click", () => {
        modalCadastro.classList.add("oculto");
        modalDetalhes.classList.add("oculto");
    });
});


function abrirDetalhes() {
    modalDetalhes.classList.remove("oculto");
}


function excluir() {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {

        alert("Aluno excluído!");
        modalDetalhes.classList.add("oculto");
    }
}

//Obter lista de emprestimos da API
fetch(url + "/emprestimos")
    .then((res) => res.json())
    .then((dados) => {
        const corpo = document.querySelector("main tbody");
        dados.forEach((emp) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td data-label="Id">${emp.id}</td>
                <td data-label="RA">${emp.alunoRa}</td>
                <td data-label="Telefone">${emp.livroId}</td>
                <td data-label="Data retirada">${new Date(emp.retirada).toLocaleDateString('pt-br')}</td>
                <td data-label="Hora retirada">${new Date(emp.retirada).toLocaleTimeString('pt-br')}</td>
                <td data-label="Data devolução">${emp.devolucao != null ? new Date(emp.devolucao).toLocaleDateString('pt-br') : "Emprestado"}</td>
                <td data-label="Hora devolução">${emp.devolucao != null ? new Date(emp.devolucao).toLocaleTimeString('pt-br') : "Emprestado"}</td>
                <td data-label="Multa">${emp.multa}</td>
                <td data-label="Detelhes">
                    <button onclick="showDetalhes('${emp.id}')">
                        Detalhes
                    </button>
                </td>
            `;
            corpo.appendChild(tr);
        });
    });

//Preencher o formulário de detalhes com os dados do emprestimo
function showDetalhes(ra) {
    fetch(url + '/emprestimos/' + ra)
        .then((res) => res.json())
        .then((dados) => {
            detalhes.id.value = dados[0].id;
            detalhes.alunoRa.value = dados[0].alunoRa;
            detalhes.livroId.value = dados[0].livroId;
            detalhes.retirada.value = dados[0].retirada.split('T')[0] + ' ' + dados[0].retirada.split('T')[1].substring(0, 5);
            detalhes.devolucao.value = dados[0].devolucao != null ? dados[0].devolucao.split('T')[0] + ' ' + dados[0].devolucao.split('T')[1].substring(0, 5) : "";
            detalhes.multa.value = dados[0].multa == null ? 0 : dados[0].multa;
            detalhes.aluno.value = dados[0].aluno.nome;
            detalhes.livro.value = dados[0].livro.titulo;

            // ✅ Exibir modal de detalhes
            modalDetalhes.classList.remove("oculto");
        });
}


//Alterar os dados do emprestimo na API
detalhes.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = {
        alunoRa: detalhes.alunoRa.value,
        livroId: Number(detalhes.livroId.value),
        retirada: new Date(detalhes.retirada.value)
    }
    if (detalhes.devolucao.value != "") {
        dados.devolucao = new Date(detalhes.devolucao.value);
    }
    if (detalhes.multa.value != 0) {
        dados.multa = Number(detalhes.multa.value);
    }
    fetch(url + "/emprestimos/" + detalhes.id.value, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then((res) => res.status)
        .then((status) => {
            if (status == 202) {
                window.location.reload();
            } else {
                alert("Erro ao enviar dados para a API!");
            }
        });
});

//Deletar emprestimo da API
function excluir() {
    const id = detalhes.id.value;
    fetch(url + "/emprestimos/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => res.status)
        .then((status) => {
            if (status == 204) {
                window.location.reload();
            } else {
                alert("Erro ao enviar dados para a API!");
            }
        });
}