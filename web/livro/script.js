url = "http://localhost:3001";

//Objetos tipo formulário do DOM
const cadastro = document.querySelector("#cadastro form");
const detalhes = document.querySelector("#detalhes form");
const emprestimos = document.querySelector("#detalhes tbody");

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
        titulo: cadastro.titulo.value,
        autor: cadastro.autor.value,
        prateleira: cadastro.prateleira.value,
    }
    fetch(url + "/livros", {
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




//Obter lista de livros da API
fetch(url + "/livros")
    .then((res) => res.json())
    .then((dados) => {
        const main = document.querySelector("main");
        dados.forEach((livro) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <div>
                <h2>${livro.titulo}</h2>
                <p>Id: ${livro.id}</p>
                <p>Autor: <u>${livro.autor}</u></p>
                <p>Prateleira: ${livro.prateleira}</9>
                <button onclick="showDetalhes(${livro.id})">
                    Detalhes
                </button>
            `;
            main.appendChild(div);
        });
    });

//Preencher o formulário de detalhes com os dados do livro
function showDetalhes(id) {
    fetch(url + '/livros/' + id)
        .then((res) => res.json())
        .then((dados) => {
            detalhes.id.value = dados[0].id;
            detalhes.titulo.value = dados[0].titulo;
            detalhes.autor.value = dados[0].autor;
            detalhes.prateleira.value = dados[0].prateleira;
            emprestimos.innerHTML = "";
            dados[0].emprestimos.forEach((emp) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td data-label="ID">${emp.id}</td>
                    <td data-label="RA">${emp.aluno.ra}</td>
                    <td data-label="Aluno">${emp.aluno.nome}</td>
                    <td data-label="Telefone">${emp.aluno.telefone}</td>
                    <td data-label="Retirada">${new Date(emp.retirada).toLocaleDateString('pt-br')}</td>
                    <td data-label="Devolução">${emp.devolucao != null ? new Date(emp.devolucao).toLocaleDateString('pt-br') : "Emprestado"}</td>
                `;
                emprestimos.appendChild(tr);
            });

            // ✅ Exibir o modal de detalhes
            modalDetalhes.classList.remove("oculto");
        });
}

//Alterar os dados do livro na API
detalhes.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = {
        titulo: detalhes.titulo.value,
        autor: detalhes.autor.value,
        prateleira: detalhes.prateleira.value,
    }
    fetch(url + "/livros/" + detalhes.id.value, {
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

//Deletar livro da API
function excluir() {
    const id = detalhes.id.value;
    fetch(url + "/livros/" + id, {
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