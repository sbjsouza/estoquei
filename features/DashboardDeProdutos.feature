Feature: Página de dashboard para B.I. Tabelas com até três produtos rankeados por: Produtos mais vendidos, Produtos com maior faturamento(valor x vendas)

    Como gestor, gostaria de visualizar o dashboard de produtos, com informações importantes para a minha decisão de escolhas no estoque. Sendo elas: Produtos mais vendidos, Produtos maior faturamento

# Service
Scenario: Não existe vendas cadastradas na plataforma
    Given eu estou na página "Dashboard de Produtos"
    When eu solicito ao sistema o "Dashboard de produtos"
    Then o sistema retorna o "Dashboard de produtos" contendo "{"top_sales": [], "top_revenues": []}"

Scenario: Existe ao menos uma venda cadastrada na plataforma
    Given eu estou na página "Dashboard de Produtos"
    And existe o produto "Cadeira" cadastrado no valor de "30 reais" 
    And existe uma venda do produto "Cadeira"
    When eu solicito ao sistema o "Dashboard de Produtos"
    Then o sistema retorna o "Dashboard de Produtos" contendo apenas o produto "Cadeira" no array de "top_sales" e de "top_revenues"

Scenario: Existe mais de três vendas cadastradas na plataforma para mais de três produtos diferentes
    Given eu estou na página "Dashboard de Produtos"
    And existe o produto "Cadeira" cadastrado no valor de "40 reais"
    And existe quatro vendas do produto "Cadeira"
    And existe o produto "Mesa" cadastrado no valor de "100 reais"
    And existe duas vendas do produto "Mesa"
    And existe o produto "Banquinho" cadastrado no valor de "25 reais"
    And existe três vendas do produto "Banquinho"
    And existe o produto "Vaso de Centro" cadastrado no valor de "20 reais"
    And existe uma venda do produto "Vaso de Centro"
    When eu solicito ao sistema o "Dashboard de Produtos"
    Then o sistema retorna o "Dashboard de Produtos" contendo três itens na lista de "top_sales" e três itens na lista de "top_revenues"
    And a lista de "top_sales" contem respectivamente: "Cadeira"(4), "Banquinho"(3), "Mesa"(2)
    And a lista de "top_revenues" contem respectivamente: "Mesa"(200), "Cadeira"(140), "Banquinho"(75)

# UI
Scenario: Existe mais de três vendas cadastradas na plataforma para mais de três produtos diferentes
    Given eu estou em qualquer página do sistema
    And existe o produto "Cadeira" cadastrado no valor de "40 reais"
    And existe quatro vendas do produto "Cadeira"
    And existe o produto "Mesa" cadastrado no valor de "100 reais"
    And existe duas vendas do produto "Mesa"
    And existe o produto "Banquinho" cadastrado no valor de "25 reais"
    And existe três vendas do produto "Banquinho"
    And existe o produto "Vaso de Centro" cadastrado no valor de "20 reais"
    And existe uma venda do produto "Vaso de Centro"
    When eu vou para página "Dashboard de Produtos"
    Then o sistema mostra duas tabelas no dashboard de produtos
    And uma tabela com título "Produtos mais vendidos" contendo respectivamente: "Cadeira"(4), "Banquinho"(3), "Mesa"(2)
    And uma tabela com título "Produtos com maior faturamento" contendo respectivamente: "Mesa"(200), "Cadeira"(140), "Banquinho"(75)