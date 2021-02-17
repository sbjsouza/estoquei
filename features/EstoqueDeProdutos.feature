Feature: Estoque de produtos
    Como gestor, eu gostaria de adicionar, editar, visualizar,
    remover e controlar a quantidade de produtos do estoque

Scenario: Adicionar um produto ao estoque
    Given "Sergio" está definido na base de dados como "Administrador"
    And "Sergio" está na "Página de Gerenciamento de Estoque"
    When eu clico em "Adicionar novo produto"
    Then sou redirecionado para a "adição de produtos"
    And eu preencho os campos "Nome", "Descrição", "Foto", "SKU", "Preço" e "quantidade"
    And eu clico em "Adicionar novo produto"
    Then eu recebo uma mensagem de "Produto adicionado"

Scenario: Editar um produto existente no estoque
    Given "Sergio" está definido na base de dados como "Administrador"
    And "Sergio" está na "Página de Gerenciamento de Estoque"
    When eu seleciono "produto 1" 
    Then eu sou direcionado para a página "Informações do produto 1"
    And eu seleciono "Editar produto"
    And eu altero "Preço" do produto
    And eu seleciono "Salvar alterações"
    Then o sistema mostra uma mensagem de "Alterações salvas com sucesso"

Scenario: Remover um produto existente no estoque
    Given "Sergio" está definido na base de dados como "Administrador"
    And "Sergio" está na "Página de Gerenciamento de Estoque"
    When eu seleciono "produto 1" 
    Then eu sou direcionado para a página "Informações do produto 1"
    And eu seleciono "Excluir produto"
    Then o sistema pergunta "Tem certeza que deseja excluir este produto?"
    And eu seleciono "Sim, excluir"
    Then o sistema mostra uma mensagem de "Produto excluído com sucesso!"

Scenario: Visualizar a descrição de um produto
    Given "Sergio" está definido na base de dados como "Administrador"
    And "Sergio" está na "Página de Gerenciamento de Estoque"
    Given o sistema possui "3 produtos" cadastrados
    When eu pergunto ao sistema sobre "descrição do produto 1"
    Then o sistema retorna "Esta é a descrição do produto 1..." 
    And o número de "produtos cadastrados" é "3"

Scenario: Adicionar um produto já existente
    Given "Sergio" está definido na base de dados como "Administrador"
    And "Sergio" está na "Página de Gerenciamento de Estoque"
    When eu clico em "Adicionar novo produto"
    And eu preencho o campo "nome do produto" com "produto 1"
    Then o sistema mostra a mensagem "Este produto já está cadastrado"

Cenário: Aumentar a quantidade do produto no estoque
    Given o sistema possui "5" unidades do "produto 1"
    When eu envio para o sistema a adição de "5" unidades do "produto 1"
    Then o sistema registra em um banco de dados o aumento do estoque do "produto 1" em "5" unidades
    And o o sistema retorna o estoque do "produto 1", que é de "10" unidades

Scenario: Adicionar um produto sem ser administrador
    Given "Sergio" está definido na base de dados como "Colaborador"
    And "Sergio" está na "Página de Gerenciamento de Estoque"
    When eu clico em "Adicionar novo produto"
    Then o sistema mostra a mensagem "Esta acção requer acesso de administrador"

Scenario: Editar um produto existente no estoque sem ser administrador
    Given "Sergio" está definido na base de dados como "Colaborador"
    And "Sergio" está na "Página de Gerenciamento de Estoque"
    When eu seleciono "produto 1" 
    Then eu sou direcionado para a página "Informações do produto 1"
    And eu seleciono "Editar produto"
    Then o sistema mostra a mensagem "Esta acção requer acesso de administrador"